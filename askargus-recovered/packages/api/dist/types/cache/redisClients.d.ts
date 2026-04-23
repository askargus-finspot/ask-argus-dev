import type { Redis, Cluster } from 'ioredis';
import type { RedisClientType, RedisClusterType } from '@redis/client';
declare let ioredisClient: Redis | Cluster | null;
declare let keyvRedisClient: RedisClientType | RedisClusterType | null;
declare let keyvRedisClientReady: Promise<void> | Promise<RedisClientType<Record<string, never>, Record<string, never>, Record<string, never>>> | null;
export { ioredisClient, keyvRedisClient, keyvRedisClientReady };
//# sourceMappingURL=redisClients.d.ts.map