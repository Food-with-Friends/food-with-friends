import { Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Order } from '../orders/order.entity';
import { UpdateOrderEventDto } from './dto/update-order-event-dto';
import { EventsService } from './events.service';

@WebSocketGateway(parseInt(process.env.SOCKET_PORT) || 3001, {
  namespace: 'events',
})
@UseGuards(AuthGuard())
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private eventsService: EventsService) {}

  private logger = new Logger('EventsGateway');

  @WebSocketServer()
  server: Server;

  users: Map<number, Set<string>> = new Map();
  clientIdsToUsers: Map<string, number> = new Map();

  pendingActions = [];

  originalOrder: Order = null;

  @SubscribeMessage('events')
  handleMessage(
    @MessageBody() message: UpdateOrderEventDto,
    @ConnectedSocket() client: Socket,
  ): WsResponse<unknown> {
    const event = 'events';
    this.pendingActions.push(message);
    return {
      event,
      data: { message, from: this.users[client.id], created: new Date() },
    };
  }

  afterInit(server: Server): void {
    this.logger.log('Initialized gateway');
  }

  async handleConnection(
    @ConnectedSocket() client: Socket,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.log(
      `User with userId ${user.id} connected with id ${client.id}`,
    );
    this.users[user.id].add(client.id);
    await this.eventsService.saveOrder(this.pendingActions, this.originalOrder);
    this.pendingActions = [];
  }

  async handleDisconnect(@ConnectedSocket() client: Socket): Promise<void> {
    this.logger.log(`Client disconnected with id ${client.id}`);

    const userId = this.clientIdsToUsers[client.id];
    this.clientIdsToUsers.delete(client.id);
    if (this.users[userId].size === 0) {
      this.logger.log(`User with id ${userId} has no more connections`);
      this.users.delete(userId);
    }

    if (this.users.size === 0) {
      this.logger.log(`All connections have dropped for ${this.server}`);
      await this.eventsService.saveOrder(
        this.pendingActions,
        this.originalOrder,
      );
      this.pendingActions = [];
    }
  }
}
