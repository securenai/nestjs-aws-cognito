import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserpoolController } from './userpool.controller';
import { UserpoolService } from './userpool.service';

@Module({
  imports: [ConfigModule],
  controllers: [UserpoolController],
  providers: [UserpoolService],
})
export class userpoolModule {}
