import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from '../orders/dto/update-order.dto';
import { Order } from '../orders/order.entity';
import { OrdersService } from '../orders/orders.service';
import { UpdateOrderEventDto } from './dto/update-order-event-dto';
import { OrderActionType } from './order-action-type.enum';

@Injectable()
export class EventsService {
  constructor(private ordersService: OrdersService) {}

  async saveOrder(pendingActions: any[], originalOrder: Order): Promise<void> {
    if (pendingActions.length == 0) {
      return;
    }

    const actionsToProcess = [...pendingActions];

    const updatedOrderActions = this.mergeActions(
      actionsToProcess,
      originalOrder,
    );

    await this.ordersService.updateOrder(
      originalOrder.id,
      updatedOrderActions,
      originalOrder.payees[0],
    );
  }

  private mergeActions(
    actions: UpdateOrderEventDto[],
    originalOrder: Order,
  ): UpdateOrderDto {
    const initialUpdateValue: UpdateOrderDto = {
      title: originalOrder.title,
      payees: originalOrder.payees,
      feesToUpdate: [],
      feesToAdd: [],
      feesToDelete: [],
      cartsToUpdate: [],
      cartsToAdd: [],
      cartsToDelete: [],
    };

    return actions.reduce<UpdateOrderDto>((accum, action) => {
      let foundIdx = 0;
      switch (action.type) {
        case OrderActionType.UPDATE_PAYEES:
          accum.payees = action.payees;
          break;

        case OrderActionType.UPDATE_TITLE:
          accum.title = action.title;
          break;

        case OrderActionType.UPDATE_FEE:
          foundIdx = accum.feesToUpdate.findIndex(
            (el) => el.id === action.feeToUpdate.id,
          );
          if (foundIdx != -1) {
            accum.feesToUpdate[foundIdx] = {
              ...accum.feesToUpdate[foundIdx],
              ...action.feeToUpdate,
            };
          } else {
            accum.feesToUpdate.push(action.feeToUpdate);
          }
          break;

        case OrderActionType.ADD_FEE:
          accum.feesToAdd.push(action.feeToAdd);
          break;

        case OrderActionType.DELETE_FEE:
          foundIdx = accum.feesToUpdate.findIndex(
            (el) => el.id === action.feeToDelete,
          );
          if (foundIdx != -1) {
            accum.feesToUpdate.splice(foundIdx, 1);
          }

          foundIdx = accum.feesToAdd.findIndex(
            (el) => el.id === action.feeToDelete,
          );
          if (foundIdx != -1) {
            accum.feesToAdd.splice(foundIdx, 1);
          } else {
            accum.feesToDelete.push(action.feeToDelete);
          }
          break;

        case OrderActionType.UPDATE_CART:
          foundIdx = accum.cartsToUpdate.findIndex(
            (el) => el.id === action.cartToUpdate.id,
          );
          if (foundIdx != -1) {
            accum.cartsToUpdate[foundIdx] = {
              ...accum.cartsToUpdate[foundIdx],
              ...action.cartToUpdate,
            };
          } else {
            accum.cartsToUpdate.push(action.cartToUpdate);
          }
          break;

        case OrderActionType.ADD_CART:
          accum.cartsToAdd.push(action.cartToAdd);
          break;

        case OrderActionType.DELETE_CART:
          foundIdx = accum.cartsToUpdate.findIndex(
            (el) => el.id === action.cartToDelete,
          );
          if (foundIdx != -1) {
            accum.cartsToUpdate.splice(foundIdx, 1);
          }

          foundIdx = accum.cartsToAdd.findIndex(
            (el) => el.id === action.cartToDelete,
          );
          if (foundIdx != -1) {
            accum.cartsToAdd.splice(foundIdx, 1);
          } else {
            accum.cartsToDelete.push(action.cartToDelete);
          }
          break;
      }
      return accum;
    }, initialUpdateValue);
  }
}
