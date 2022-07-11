import dotenv from 'dotenv';
import express from 'express';
import upload from '../config/multer.config';
import ConfirmationController from '../controllers/ConfirmationController';
import LoginController from '../controllers/LoginController';
import ProductController from '../controllers/ProductController';
import UserController from '../controllers/UserController';
import verifyJWT from '../middleware/verifyJWT';

dotenv.config();

const routes = express.Router();

const userController = new UserController();
const productController = new ProductController();
const loginController = new LoginController();
const confirmationController = new ConfirmationController();

routes.post(`${process.env.API_VERSION}/login`, loginController.index);
routes.get(`${process.env.API_VERSION}/confirm/:confirmationCode`, confirmationController.verifyUser);

routes.get(`${process.env.API_VERSION}/users`, verifyJWT, userController.show)
routes.post(`${process.env.API_VERSION}/register`, userController.create);

routes.post(`${process.env.API_VERSION}/users`, verifyJWT, userController.create);

routes.get(`${process.env.API_VERSION}/products`, verifyJWT, productController.show);
routes.post(`${process.env.API_VERSION}/products`, verifyJWT, upload.array('image', 10), productController.create);
routes.delete(`${process.env.API_VERSION}/products`, verifyJWT, productController.delete);
routes.put(`${process.env.API_VERSION}/products`, verifyJWT, productController.put);

routes.get(`${process.env.API_VERSION}/postman/products`, productController.show);
routes.delete(`${process.env.API_VERSION}/postman/products`, productController.delete);

export default routes;
