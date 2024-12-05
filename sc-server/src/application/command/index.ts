import { AuthHandlers } from './auth/handler';
import { OtpHandlers } from './otp/handlers';
import { UserHandlers } from './user/handlers';

export const CommandHandlers = [...AuthHandlers, ...OtpHandlers, ...UserHandlers];
