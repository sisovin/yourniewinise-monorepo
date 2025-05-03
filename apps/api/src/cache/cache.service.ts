import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly redisService: RedisService) {}

  async onModuleInit() {
    // Initialize cache service if needed
  }

  async onModuleDestroy() {
    // Clean up cache service if needed
  }

  async get(key: string): Promise<string | null> {
    return this.redisService.get(key);
  }

  async set(key: string, value: string): Promise<unknown> {
    return this.redisService.set(key, value);
  }

  async del(key: string): Promise<unknown> {
    return this.redisService.del(key);
  }
}
