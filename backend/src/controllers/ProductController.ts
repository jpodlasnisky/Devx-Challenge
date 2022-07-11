import { Request, Response } from 'express';
import db from '../database/connection';
import ImageUploadController from './ImageUploadController';


export default class ProductController {
  async create(request: Request, response: Response) {
    const imageUploadController = new ImageUploadController();

    const {
      name,
      description,
      price,
      created_by,
    } = request.body;

    const imagesUploadCDN = request.files;

    const trx = await db.transaction();

    const imageArrayCDN = await imageUploadController.create(imagesUploadCDN);
    try {
      const insertProduct = await trx("products").insert({
        name,
        description,
        price,
        product_images: JSON.stringify({ "images_url": imageArrayCDN }),
        created_by
      })

      await trx.commit();

      return response.status(201).json({
        success: `Product ${name} created successfully`
      })

    } catch (e) {
      await trx.rollback();

      return response.status(400).json({
        error: "Unexpected error while creating user"
      })
    }
  }

  async put(request: Request, response: Response) {
    const {
      id,
      name,
      description,
      price } = request.body;

    if (id) {
      await db('products').where({ id }).update({ "name": name, "description": description, "price": price });
      return response.status(200).json({ success: 'Product updated successfully' });
    } else {
      return response.status(400).json({ error: "Unexpected error while updating" });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.body;

    if (id) {
      await db('products').where({ id }).del();
      return response.status(200).json({ success: 'Product deleted successfully' });
    } else {
      return response.status(400).json({ error: "Unexpected error while deleting" });
    }


  }
  async show(request: Request, response: Response) {
    let products
    const id = request.query.user_id;
    if (id) {
      products = await db('products').select('*').where('created_by', Number(id));
    } else {
      products = await db('products').select('*');
    }

    const serializedproducts = products.map(product => {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        product_images: product.product_images,
        created_by: product.created_by,
        published_at: product.published_at
      }
    });

    return response.json(serializedproducts);
  }

}
