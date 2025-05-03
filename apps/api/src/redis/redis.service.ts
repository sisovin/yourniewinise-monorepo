import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { RedisClient } from 'redis';
import { promisify } from 'util';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClient;
  private getAsync: (key: string) => Promise<string | null>;
  private setAsync: (key: string, value: string) => Promise<unknown>;
  private delAsync: (key: string) => Promise<unknown>;

  async onModuleInit() {
    this.client = new RedisClient({ url: process.env.REDIS_URL });
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  async onModuleDestroy() {
    this.client.quit();
  }

  async get(key: string): Promise<string | null> {
    return this.getAsync(key);
  }

  async set(key: string, value: string): Promise<unknown> {
    return this.setAsync(key, value);
  }

  async del(key: string): Promise<unknown> {
    return this.delAsync(key);
  }
}
