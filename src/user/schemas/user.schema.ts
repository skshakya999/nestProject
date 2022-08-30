import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({unique:true})
  name: string;

  @Prop()
  email: string;
  @Prop()
  password:string

  @Prop()
  mobile:string;

  @Prop({type:Object})
  address:{};

  @Prop({type:Object})
  profilePic:{};
}

export const UserSchema = SchemaFactory.createForClass(User);