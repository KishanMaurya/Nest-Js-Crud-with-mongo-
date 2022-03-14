import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
  
  import { UsersService } from './users.service';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post()
    async addProduct(
      @Body('title') prodTitle: string,
      @Body('description') prodDesc: string,
      @Body('price') prodPrice: number,
    ) {
  
      // let createObj={
      //   title: prodTitle,
      //   description: prodDesc,
      //   price: prodPrice
      // }
      const generatedId = await this.usersService.insertProduct(prodTitle, prodDesc, prodPrice);
      return { id: generatedId };
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
  