import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/Create-user.dto';
import { User } from 'src/mysqlitable/UserEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class MysqlsongsService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}

   async findAll():Promise<User[]>{
        return this.usersRepository.find();
    }

    async createuser(createuserDTO:CreateUserDto): Promise<User>{
        const user= this.usersRepository.create(createuserDTO);
        return this.usersRepository.save(user)
    }

    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
      }

      async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id); // Use findOne to ensure the user exists
        this.usersRepository.merge(user, updateUserDto);
        return this.usersRepository.save(user);
      }
    
      async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        await this.usersRepository.remove(user);
      }
}
