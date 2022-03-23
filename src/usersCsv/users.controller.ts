import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    UploadedFile, UseInterceptors
  } from '@nestjs/common';
  
  import { UsersService } from './users.service';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { MulterModule } from '@nestjs/platform-express';
  import { Express } from 'express'
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}



    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async addProduct(@UploadedFile() file: Express.Multer.File) {

      console.log(file);

      const result = await this.usersService.insertProduct(file);
      return { 
        data: result,
        status: 200,
        msg: "success"
      };
    }
  
    @Get()
    async getAllProducts() {
      const products = await this.usersService.getProducts();
      return products;
    }
  
    @Get(':id')
    getProduct(@Param('id') prodId: string) {
      return this.usersService.getSingleProduct(prodId);
    }
  
    @Patch(':id')
    async updateProduct(
      @Param('id') prodId: string,
      @Body('title') prodTitle: string,
      @Body('description') prodDesc: string,
      @Body('price') prodPrice: number,
    ) {
      await this.usersService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
      return null;
    }
  
    @Delete(':id')
    async removeProduct(@Param('id') prodId: string) {
        await this.usersService.deleteProduct(prodId);
        return null;
    }
  }
  