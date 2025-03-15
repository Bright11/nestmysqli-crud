import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
// import UserService
import { UsersService } from './users.service';
// importing our dto
import { CreateUserDto } from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto'

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}
     /*
    GET /users
    GET /users/:id
    POST /users
    PATCH: /users/:id
    DELETE: /users/:id
    */

    // @Get() //GET /users
    // findAll(){
    //     return this.userService.findAll
    // }

    @Get() //GET /users, QUERY USERS BY ROLE which can also serve as findall
    getbyquery(@Query('role') role?: 'INTERN' | "ENGINEER" | 'ADMIN'){
        return this.userService.getbyquery(role)
    }


    // this type of route must be above the rout id
    // @Get('interns') // GET /users/interns
    // findAllInterns(){
    //     return []
    // }

    // get by id
    @Get(':id') //GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.userService.findOne(id) //the + is to convert the id into a number using unary
    }

    // post /users
    @Post() //POST /users
    create(@Body(ValidationPipe) CreateUserDto: CreateUserDto){
        return this.userService.create(CreateUserDto)
    }

    // PATCH /user/:id
    @Patch(':id') // Patch /user/:id
    update(@Param("id", ParseIntPipe) id: number, @Body(ValidationPipe)updateUserDto: UpdateUserDto){
        return this.userService.update(id, updateUserDto)
    }
  
      // DELETE /user/:id
      @Delete(':id') // Delete /user/:id
      delete(@Param("id", ParseIntPipe) id: number){
          return this.userService.delete(id)
      }
}
