import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Leanne Graham",
            "email": "Sincere@april.biz",
            "role": "INTERN",
        },
        {
            "id": 2,
            "name": "Ervin Howell",
            "email": "Shanna@melissa.tv",
            "role": "INTERN",
        },
        {
            "id": 3,
            "name": "Clementine Bauch",
            "email": "Nathan@yesenia.net",
            "role": "ENGINEER",
        },
        {
            "id": 4,
            "name": "Patricia Lebsack",
            "email": "Julianne.OConner@kory.org",
            "role": "ENGINEER",
        },
        {
            "id": 5,
            "name": "Chelsey Dietrich",
            "email": "Lucio_Hettinger@annie.ca",
            "role": "ADMIN",
        }
    ]
    // when doing this to find or fetch users, remember to refer to the sections in controller, Eg if you have findAll in controller, you must called it findAll in your service
    // findAll(){
    //     return this.users
    // }
    getbyquery(role?: 'INTERN' | "ENGINEER" | 'ADMIN'){
        if(role){
            // if the user pass or want to filter by role, it will return the role
            const roleArray = this.users.filter(user => user.role === role)
            if(roleArray.length === 0) throw new NotFoundException("User not found")
                return roleArray
        }
        // if no role was pass, it will return all users
        return this.users
    }

    // getting user by id
    findOne(id:number){
        const user = this.users.find(user => user.id === id)
        if(!user) throw new NotFoundException('User not found')
        return user
    }
    // creating a new user
    create(createUserDto: CreateUserDto){
        const usersByHighestId= [...this.users].sort((a,b) => b.id - a.id)
        const newUser={
            id: usersByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
    }

    // update
    update(id:number, updateUserDto: UpdateUserDto){
        this.users = this.users.map(user => {
            // here weare checking if the incoming id matches with the id in database
            if(user.id === id){
                return { ...user, ...updateUserDto}
            }
            // if no id match we retrn the user
            return user
        })
        // returning the updated user
        return this.findOne(id)
    }

    // delete data
    delete(id:number){
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }
}
