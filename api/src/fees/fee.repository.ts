import { EntityRepository, Repository } from 'typeorm';
import { Fee } from './fee.entity';
import { Logger } from '@nestjs/common';
import { CreateFeeDto } from './dto/create-fee-dto';

@EntityRepository(Fee)
export class FeeRepository extends Repository<Fee> {
  private logger = new Logger('FeeRepository');

  async createFees(createFeeDtos: CreateFeeDto[]): Promise<Fee[]> {
    const fees = createFeeDtos.map((createFeeDto) => {
      const { title, amount, isPercent } = createFeeDto;
      const fee = new Fee();
      fee.title = title;
      fee.amount = amount;
      fee.isPercent = isPercent;
      return fee;
    });

    try {
      await this.save(fees);
    } catch (error) {
      this.logger.error(
        `Failed to create fees "${JSON.stringify(fees)}"`,
        error.stack,
      );
    }

    return fees;
  }
}
