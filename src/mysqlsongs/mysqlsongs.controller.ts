import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { MysqlsongsService } from './mysqlsongs.service';
import { CreateUserDto } from './dto/Create-user.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('mysqlsongs')
export class MysqlsongsController {
    constructor(
        private mysqlservice:MysqlsongsService ){}

    @Get()
    findAll(){
        return this.mysqlservice.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
      return this.mysqlservice.findOne(id);
    }
  
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
      return this.mysqlservice.createuser(createUserDto);
    }
  
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
      return this.mysqlservice.update(id, updateUserDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: number) {
      await this.mysqlservice.remove(id);
      return { message: `User with ID ${id} deleted successfully` };
    }


}
