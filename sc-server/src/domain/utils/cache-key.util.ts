export class CacheKeyUtil {
  static getOtpCacheKey = (email: string, action: string): string => `OTP_${action}_${email}`;
}
