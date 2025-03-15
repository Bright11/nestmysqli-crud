import {CreateUserDto} from './create-user.dto'
import {PartialType} from '@nestjs/mapped-types'

// in this case we have to install @nestjs/mapped-types
//  npm install @nestjs/mapped-types
// npm install class-validator class-transformer
// 
// we use this PartialType to make our fileds not to be required
export class UpdateUserDto extends PartialType(CreateUserDto){}