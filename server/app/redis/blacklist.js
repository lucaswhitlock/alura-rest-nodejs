import redis from "redis";
import jwt from "jsonwebtoken";

import { promisify } from "util";
import { createHash } from "crypto";

const redisClient = redis.createClient({ prefix: "blacklist:" });

const asyncExists = promisify(redisClient.exists).bind(redisClient);

const asyncSet = promisify(redisClient.set).bind(redisClient);

const hashToken = token => {
  return createHash('sha256').update(token).digest('hex');
}

const blacklistToken = async token => {
  await asyncSet(hashToken(token), "");
  redisClient.expireat(hashToken(token), jwt.decode(token).exp);
}

const isTokenBlacklisted = async token => {
  var exists = new Boolean(await asyncExists(hashToken(token)));
  if (exists) {
    throw new jwt.JsonWebTokenError("This token was invalidated by a logout action!")
  }
}

export { redisClient, blacklistToken, isTokenBlacklisted };