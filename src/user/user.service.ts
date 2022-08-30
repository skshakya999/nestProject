import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User, UserDocument } from './schemas/user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { Helper } from 'src/helper/helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly usermodel: Model<UserDocument>,
    private jwt: JwtService) { }

  async create(createUserDto: CreateUserDto, file) {

    const userAlreadyExist = await this.usermodel.findOne({ name: createUserDto.name })
    if (!userAlreadyExist) {
      if (!file) {
        const newUser = await new this.usermodel(createUserDto).save();
        return {
          success: true,
          message: "User created Successfully",
          newUser
        }
      }
      else {
        const pic = {
          fileName: file.filename,
          path: file.path
        }

        const newUser = await new this.usermodel({
          name: createUserDto.name,
          email: createUserDto.email,
          mobile: createUserDto.mobile,
          profilePic: pic
        }).save();

        return {
          success: true,
          message: "User created Successfully",
          newUser

        }
      }
    }
    else {
      return {
        success: false,
        message: "User Alredy Exist"

      }
    }
  }

  async find() {
    return await this.usermodel.find();
  }
  async findOne(findUser: CreateUserDto) {
    return await this.usermodel.findOne(findUser);
  }

  async userLogin(loginUser: LoginUserDto) {
    const log = await this.usermodel.findOne(loginUser)
    if (log) {
      const paylod = { userId: log._id }
      const token = this.jwt.sign(paylod, { secret: process.env.SECRETE_KEY })
      return {
        success: true,
        message: "Login successfully",
        token: token,
      }
    }
    else {
      return {
        success: false,
        message: "Invalid credentials"
      }
    }

  }

  async updateUser(update: UpdateUserDto) {

    const updateNumber = await this.usermodel.findOneAndUpdate({ mobile: update.mobile }, { $set: { mobile: update.newMobile } }, { new: true })

    return updateNumber
  }

  async deleteUser(id){
    const deletedUser = await this.usermodel.deleteOne({_id:id})
    return deletedUser
  }
}