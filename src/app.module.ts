import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),MongooseModule.forRoot("mongodb+srv://Sumit:Shakya123@cluster0.of12ajb.mongodb.net/nestDB"),UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
