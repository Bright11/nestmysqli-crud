import { Module } from '@nestjs/common';
import { MysqlsongsService } from './mysqlsongs.service';
import { MysqlsongsController } from './mysqlsongs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/mysqlitable/UserEntity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    MysqlsongsService,
  ],
  exports:[MysqlsongsService],
  controllers: [MysqlsongsController]
})
export class MysqlsongsModule {}


