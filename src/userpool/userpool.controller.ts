import { Controller, Get } from '@nestjs/common';

@Controller('/userpool')
export class UserpoolController {
  @Get('/describe')
  helloWorld() {
    return 'Hello World';
  }
}
