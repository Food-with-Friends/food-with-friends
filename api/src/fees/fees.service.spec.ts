import { Test, TestingModule } from '@nestjs/testing';
import { FeesService } from './fees.service';
import { FeeRepository } from './fee.repository';

const mockFeeRepository = () => ({
  // TODO: fill out mock
});

describe('FeesService', () => {
  let feeService: FeesService;
  let feeRepository: FeeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeesService,
        {
          provide: FeeRepository,
          useFactory: mockFeeRepository,
        },
      ],
    }).compile();

    feeService = module.get<FeesService>(FeesService);
    feeRepository = module.get<FeeRepository>(FeeRepository);
  });

  it('should be defined', () => {
    expect(feeService).toBeDefined();
  });
});
