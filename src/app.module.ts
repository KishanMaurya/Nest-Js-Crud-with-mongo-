import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './usersCsv/users.module';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb://localhost:27017/nestCSV',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
