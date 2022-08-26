import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Res,

} from '@nestjs/common';
import { response } from 'express';
import { CreateUserDto } from './dto/user.dto';
//import { UpdateTodoDto } from './dto/update-todo.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) { }

    

    // async findOne(mobile: number): Promise<Todo[mobile]> {
    //     return await this.model.findOne(mobile).exec();
    //   }
    // @Get()
    // async index() {
    //     return await this.service.find();
    // }

    @Post("signup")
    async create(@Res() response,@Body() createuserDto: CreateUserDto) {
        const newUser =await this.service.create(createuserDto);
        return response.status(HttpStatus.CREATED).json(newUser)   }

    @Get()
    async getOne(@Body() findUser: CreateUserDto) {
      return await this.service.findOne(findUser);
    }

    // @Delete(':id')
    // async delete(@Param('id') id: string) {
    //   return await this.service.delete(id);
    // }
}