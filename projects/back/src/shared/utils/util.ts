import { getReasonPhrase } from 'http-status-codes';
import { v4 } from 'uuid';

import { Util } from 'shared-workers';

/**
 * Returns true if env === 'production'
 */
export const isProduction = Util.isProd;

/**
 * Returns true if env === 'test'
 */
export const isTest = Util.isTest;

/**
 * Generates an uuid
 */
export const genUuid = (): string => v4();

/**
 * Ensures a boolean is returned from an string
 */
export const strToBool = Util.readBool;

/**
 * Tries to parse int or returns default
 */
export const strToInt = Util.readInt;

/**
 * Tries to parse a float or returns default
 */
export const strToFloat = Util.readFloat;

/**
 * Computes a percentage, can be inverted
 */
export const percentage = Util.percentage;

/**
 * Async promise which resolves after given seconds
 */
export const awaitSeconds = Util.awaitSeconds;

/**
 * Async promise which resolves after given milliseconds
 */
export const awaitMillis = Util.awaitMillis;

export const statusTextFromCode = (code: number): string => {
  try {
    return getReasonPhrase(code).toLowerCase().replace(/\s/g, '_');
  } catch (error) {
    return 'Unknown';
  }
};
