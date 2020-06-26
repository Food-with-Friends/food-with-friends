import { Module } from '@nestjs/common';
import { FeesService } from './fees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeeRepository } from './fee.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([FeeRepository]), AuthModule],
  providers: [FeesService],
  exports: [FeesService],
})
export class FeesModule {}
