import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      rawBody?: any;
      user?: {
        id: string;
        role: string;
        email: string;
      };
    }
  }
}
