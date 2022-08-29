import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {CreateUserDto} from './dto/user.dto'
import {UpdateUserDto} from './dto/update-user.dto'
import { User, UserDocument } from './schemas/user.schema';
import { LoginUserDto } from './dto/login-user.dto';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>,
   private jwt :JwtService ) {}

  async create(createUserDto:CreateUserDto) {
    const userAlreadyExist = await this.model.findOne({name:createUserDto.name})
    if(!userAlreadyExist)
    {
        const newUser = await new this.model(createUserDto).save();
        
    return {
        success:true,
        message:"User created Successfully",
        newUser
     
    }}
    else{
        return{
            success:false, 
            message:"User Alredy Exist"

        }
    }
  }

  async find(){
    return await this.model.find();
  }
  async findOne(findUser:CreateUserDto) {
    return await this.model.findOne(findUser);
  }

  async userLogin(loginUser:LoginUserDto){
    const log =  await this.model.findOne(loginUser)
    const paylod = {userId : log._id}
    const token = this.jwt.sign(paylod,{secret:"mykey"})
    return token
  }

  async updateUser(update:UpdateUserDto) {
 
    
    //const user = await this.model.findOne({mobile:update.mobile});
    const updateNumber = await this.model.findOneAndUpdate({mobile:update.mobile},{$set:{mobile:update.newMobile}},{new:true})
    
    // const user = await this.model.findOne({mobile:update.newMobile});
   
    
    return updateNumber
}

//   async findAll(): Promise<Todo[]> {
//     return await this.model.find().exec();
//   }
}