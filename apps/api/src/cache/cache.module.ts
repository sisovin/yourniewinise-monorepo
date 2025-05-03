import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [
    RedisModule.forRoot({
      url: process.env.REDIS_URL,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
