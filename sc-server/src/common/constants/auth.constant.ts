enum TokenType {
  ACCESS = 'ACCESS_TOKEN',
  REFRESH = 'REFRESH_TOKEN',
}

export class AuthConstants {
  static readonly BCRYPT_SALT: number = 10;
  static readonly TokenType = TokenType;
  static readonly USER_AUTH_KEY = 'USER_AUTH_KEY';
  static readonly OTP_LENGTH = 6;
  static readonly ROLES_KEY = 'roles';
}
