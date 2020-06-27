import { Test, TestingModule } from '@nestjs/testing';
import { CartItemsService } from '../cart-items/cart-items.service';
import { CartRepository } from './cart.repository';
import { CartsService } from './carts.service';

const mockCartItemsService = () => ({
  // TODO: fill out mock
});

const mockCartRepository = () => ({
  // TODO: fill out mock
});

describe('CartsService', () => {
  let cartsService: CartsService;
  let cartRepository: CartRepository;
  let cartItemsService: CartItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartsService,
        { provide: CartRepository, useFactory: mockCartRepository },
        { provide: CartItemsService, useFactory: mockCartItemsService },
      ],
    }).compile();

    cartsService = module.get<CartsService>(CartsService);
    cartRepository = module.get<CartRepository>(CartRepository);
    cartItemsService = module.get<CartItemsService>(CartItemsService);
  });

  it('should be defined', () => {
    expect(cartsService).toBeDefined();
  });
});
