import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) { }
  async use(req: Request, res: Response, next: NextFunction) {

    try {
      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        const Token = req.headers.authorization.split(' ')[1];
        console.log(Token);
        
        if (!Token) {
         return res.status(400).json({
            success: false,
            message: "Unouthorize access"
          })
        }
        else {
          const verifyTok = await this.jwtService.verify(Token,{secret:process.env.SECRETE_KEY})
          
          if (verifyTok) {
            //console.log(verifyTok);
            next()

          } else {
            res.status(400).json({
              success: false,
              message: "Unouthorize access"
            })
          }
        }
      } else {
        res.status(400).json({
          success: false,
          message: "Unouthorize access"
        })
      }
    }
    catch (err) {
      console.log(err);

    }
  }
}
