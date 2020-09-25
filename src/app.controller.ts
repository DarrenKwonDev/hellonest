import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('')
export class AppController {
  @Get()
  home(@Req() request: Request, @Res() response: Response) {
    console.log(Object.keys(request));
    console.log(Object.keys(response));
    return 'this is home';
  }
}
