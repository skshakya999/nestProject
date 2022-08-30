
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const UserToken = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let user;
    if (!request.header('authorization')) {
      return {
        success: false,
        message: 'Unauthorized acess',
      };
    } else {
      user = JwtService.prototype.decode(
        request.header('authorization').split(' ')[1],
      );
      const userId = user['userId'];
      console.log(userId);
      
      return userId;
    }
  },
);