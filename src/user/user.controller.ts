import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Res,
    Put,
    Req
} from '@nestjs/common';
import { response } from 'express';
import { CreateUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer';
import { Helper } from 'src/helper/helper';
import { UserToken } from 'src/middleware/verifyToken';




@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) { }



    @Post("signup")
    @UseInterceptors(
        FileInterceptor('file',  {
          storage: diskStorage({
            destination: './img',
            filename : Helper.customfileName
          }),
          fileFilter: Helper.validFile,
        }),
      )

    async create(@Req() req,@Res() response, @Body() createuserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File) {
       
      if(req.fileValidationError){
        return response.status(400).json({
            success : false,
            message : "only image files are allowed"
        })
      }
   
        const newUser = await this.service.create(createuserDto,file);

        return response.status(HttpStatus.CREATED).json({ newUser })
    }

    @Get()
    async getOne(@Body() findUser: CreateUserDto) {
        return await this.service.findOne(findUser);
    }

    @Post("login")
    async userLogin(@Res() res, @Body() loginUser: LoginUserDto) {
        const userLoggedIn = await this.service.userLogin(loginUser)
        return res.status(HttpStatus.OK).json(userLoggedIn)
    }
    @Put("update")
    async updateUser(@Res() res, @Body() dataToUpdate: UpdateUserDto,@UserToken() tok) {
console.log(tok);

        const yupdate = await this.service.updateUser(dataToUpdate);
        return res.status(HttpStatus.OK).json(yupdate);
    }


    // @Delete(':id')
    // async delete(@Param('id') id: string) {
    //   return await this.service.delete(id);
    // }
}