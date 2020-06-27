import { Test, TestingModule } from '@nestjs/testing';
import { CartItemsService } from './cart-items.service';
import { CartItemRepository } from './cart-item.repository';

const mockCartItemRepository = () => ({
  // TODO: fill out mock
});

describe('CartItemsService', () => {
  let cartItemsService: CartItemsService;
  let cartItemRepository: CartItemRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartItemsService,
        { provide: CartItemRepository, useFactory: mockCartItemRepository },
      ],
    }).compile();

    cartItemsService = module.get<CartItemsService>(CartItemsService);
    cartItemRepository = module.get<CartItemRepository>(CartItemRepository);
  });

  it('should be defined', () => {
    expect(cartItemsService).toBeDefined();
  });
});
