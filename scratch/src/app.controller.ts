import {Controller, Get} from "@nestjs/common";

@Controller('app')
export class AppController {
  @Get('/main')
  getRootRoute() {
    return 'Hi there';
  }
}