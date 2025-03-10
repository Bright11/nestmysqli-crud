import { Injectable, NestMiddleware } from '@nestjs/common';
/**
 * How to create a middleware
 * create a folder with any name of your choice
 * nest g  mi common/middleware/logger --no-spec --no-flat
 * 
 * To configure this middleware, navigate into app.module and configure it



 */ 

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Request.......', new Date().toString());
    next();
  }
}
