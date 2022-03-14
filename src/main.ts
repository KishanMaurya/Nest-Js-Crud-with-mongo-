import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const  App = async()=>{
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

App();



// module.exports = bootstrap;
