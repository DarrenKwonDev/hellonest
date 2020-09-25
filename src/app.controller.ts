import { Controller, Get, Req, Res } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  home() {
    return 'this is home';
  }
}
