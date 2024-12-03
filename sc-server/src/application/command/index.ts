import { AuthHandlers } from './auth/handler';
import { OtpHandlers } from './otp/handler';

export const CommandHandlers = [...AuthHandlers, ...OtpHandlers];
