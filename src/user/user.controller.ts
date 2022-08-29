import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Res,
    Put
} from '@nestjs/common';
import { response } from 'express';
import { CreateUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
//import { UpdateTodoDto } from './dto/update-todo.dto';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common';


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
    @UseInterceptors(FileInterceptor('file'))
    async create(@Res() response,@Body() createuserDto: CreateUserDto,@UploadedFile() file: Express.Multer.File) {
        const newUser =await this.service.create(createuserDto);
        return response.status(HttpStatus.CREATED).json(newUser)   }

    @Get()
    async getOne(@Body() findUser: CreateUserDto) {
      return await this.service.findOne(findUser);
    }

    @Post("login")
    async userLogin(@Res() res, @Body() loginUser : LoginUserDto){
        const userLoggedIn = await this.service.userLogin(loginUser)
        return res.status(HttpStatus.OK).json(userLoggedIn)
    }
    @Put("update")
    async updateUser(@Res() res,@Body() dataToUpdate: UpdateUserDto){

    const yupdate = await this.service.updateUser(dataToUpdate);
    return res.status(HttpStatus.OK).json(yupdate);
    }


    // @Delete(':id')
    // async delete(@Param('id') id: string) {
    //   return await this.service.delete(id);
    // }
}