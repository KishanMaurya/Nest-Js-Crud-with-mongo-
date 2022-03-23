import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
const {fs , readFileSync} = require("fs");
const csvUploader = require("./csvUploader");
import { Users } from './users.models';

import {parse}   from 'papaparse'
const csv=require('csvtojson')
const formidable = require("formidable");


@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<Users>,
  ) {}


  async insertProduct(filereq: any) {



    let fileReader = readFileSync('./private/csv/misingAjmer.csv');

    let fileData = fileReader.toString();


    const csvData = await parse(fileData, {
      header: true,
      columns: true,
      skip_empty_lines: true,
      skip_lines_with_empty_values: true,
      TransformHeader : (header)=> header.toLowerCase().replace(/\s/g, '_').trim(),
      complete: (result)=> result.data
    });


    console.log(csvData);

    let inerteddata = []

    for(let item of csvData.data){
      let makeData= {
        title: item.title,
        price: item.price,
        description: item.description,
      }
      let uploadData = await this.usersModel.insertMany(makeData);
      inerteddata.push(uploadData);
    }


    
return inerteddata;
  
}



  async getProducts() {
    const products = await this.usersModel.find().exec();
    return products.map(prod => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    updatedProduct.save();
  }

  async deleteProduct(prodId: string) {
    const result = await this.usersModel.deleteOne({_id: prodId}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }

  private async findProduct(id: string): Promise<Users> {
    let product;
    try {
      product = await this.usersModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}
