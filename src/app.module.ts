import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { MysqlsongsModule } from './mysqlsongs/mysqlsongs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './mysqlitable/UserEntity';
import { ProductModule } from './product/product.module';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';
import { ProductService } from './product/product.service';
import { Product } from './product/product.entity';
import { Category } from './category/category.entity';

@Module({
  imports: [
    SongsModule,
    MysqlsongsModule,
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'',
      database:'nestmysql',
      entities: [User,Product,Category], 
      synchronize: true, // Auto-create database tables (development only!)
      
    }
  
  ),
    ProductModule,
    CategoryModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})

// without middleware
// export class AppModule {}

// with middleware
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs')
    // for only post request
    // consumer.apply(LoggerMiddleware).forRoutes({path:'songs', method:RequestMethod.POST})
    consumer.apply(LoggerMiddleware).forRoutes(SongsController)
    // this LoggerMiddleware is the name of the middleware
    // and songs is the route or folder which you want the middleware to be apllied
  }
}
