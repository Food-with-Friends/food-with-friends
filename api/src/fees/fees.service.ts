import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeeRepository } from './fee.repository';
import { Fee } from './fee.entity';
import { CreateFeeDto } from './dto/create-fee-dto';
import { UpdateFeeDto } from './dto/update-fee-dto';

@Injectable()
export class FeesService {
  constructor(
    @InjectRepository(FeeRepository)
    private feeRepository: FeeRepository,
  ) {}

  async createFees(fees: CreateFeeDto[]): Promise<Fee[]> {
    return this.feeRepository.createFees(fees);
  }

  async deleteFees(ids: number[]): Promise<void> {
    const result = await this.feeRepository.delete(ids);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Tried to delete non-existent ID for fees in "${ids}"`,
      );
    }
  }

  async updateFees(fees: UpdateFeeDto[]): Promise<Fee[]> {
    return this.feeRepository.updateFees(fees);
  }
}
