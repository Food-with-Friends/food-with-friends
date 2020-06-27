import { Module } from '@nestjs/common';
import { FeesService } from './fees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeeRepository } from './fee.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FeeRepository])],
  providers: [FeesService],
  exports: [FeesService],
})
export class FeesModule {}
