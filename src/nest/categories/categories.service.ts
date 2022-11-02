import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Category } from '../../entities/categories.entity';
import { uuid } from 'uuidv4';

Injectable;
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: MongoRepository<Category>,
  ) {}

  async findAll(type: string) {
    const cursor = await this.categoryRepository
      .aggregate([
        {
          $match: {
            categoryType: type,
          },
        },
        {
          $graphLookup: {
            from: 'Categories',
            startWith: '$catId',
            connectFromField: 'catId',
            connectToField: 'child',
            maxDepth: 2,
            as: 'subCategory',
          },
        },
        // {$unwind: "$subCategory"},
      ])
      .toArray();
    return cursor;
  }

  async findAllCategories() {
    const cursor = await this.categoryRepository.find();
    return cursor;
  }

  uid() {
    return (
      Date.now().toString(36) +
      Math.random()
        .toString(36)
        .substr(2)
    );
  }

  async create(input: any): Promise<Category> {
    const data = await this.categoryRepository.findBy({ name: input.name });
    console.log('Data', data);
    if (data) {
      console.log('Already Exist');
    } else {
      const category = new Category();
      category.categoryType = input.categoryType;
      category.name = input.name;
      category.code = this.uid();
      category.catId = uuid();
      const savedObje = await this.categoryRepository.save(category);
      return savedObje;
    }
  }

  async deleteById(id) {
    const data = await this.categoryRepository.findOneBy({
      where: {
        catId: id,
      },
    });
    if (data.child === '') {
      const data2 = await this.categoryRepository.find({
        where: {
          child: data.catId,
        },
      });
      data.isdeleted = true;
      const subcategories = data2.map(_ => {
        return {
          ..._,
          isdeleted: true,
        };
      });
      return (
        this.categoryRepository.save(subcategories) &&
        this.categoryRepository.save(data)
      );
    } else {
      data.isdeleted = true;
      return this.categoryRepository.save(data);
    }
  }
}
