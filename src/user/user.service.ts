import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {CreateUserDto} from './dto/user.dto'
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>) {}

  async create(createUserDto:CreateUserDto) {
    const userAlreadyExist = await this.model.findOne({name:createUserDto.name})
    if(!userAlreadyExist)
    {
        const newUser =  new this.model(createUserDto).save();
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


//   async findAll(): Promise<Todo[]> {
//     return await this.model.find().exec();
//   }
}