import { IsEmail, IsEnum , IsNotEmpty, IsString} from "class-validator";
// in this case we have to install @nestjs/mapped-types
//  npm install @nestjs/mapped-types
// npm install class-validator class-transformer
// 
export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;
    @IsEnum(["INTERN", "ENGINEER", "ADMIN"],{
        message: "Valide rolr is required"
    })
    role: "INTERN" | "ENGINEER" | "ADMIN";
}