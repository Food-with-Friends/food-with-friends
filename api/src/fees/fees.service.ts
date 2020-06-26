import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeeRepository } from './fee.repository';
import { Fee } from './fee.entity';
import { CreateFeeDto } from './dto/create-fee-dto';

@Injectable()
export class FeesService {
  constructor(
    @InjectRepository(FeeRepository)
    private feeRepository: FeeRepository,
  ) {}

  async createFees(fees: CreateFeeDto[]): Promise<Fee[]> {
    return this.feeRepository.createFees(fees);
  }
}
