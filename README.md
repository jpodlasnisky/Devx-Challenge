# JS Code Challenge sent by DevXSolutions
JS application developed to solve the challenged proposed by DevXSolutions. 
Both backend and frontend were developed by me to solve this. Pay attention to the following:
1. Create your own .env files. There're samples on backend and frontend folders.
2. Run a PostgreSQL server and a Redis Server through Docker. (the docker-compose file is located in root folder)
2.1 Run knex migrate:up for PostgreSQL preparation. The knexfile is located in root folder.
3. Run ```npm install``` and ```npm start``` for /backend and /frontend. They're two distinct enviroments. 
4. The default config for backend will run on http://localhost:3333
5. The default config for frontend will run on http://localhost:3000
6. If you have any doubts or issues about the project, don't hesitate to contact me.

## Languages, Frameworks and Technologies
> ![npm](https://img.shields.io/npm/v/express?color=black&label=NodeJS&logo=node.js)
> ![ts](https://flat.badgen.net/badge/-/TypeScript/blue?icon=typescript&label)
> ![css](https://img.shields.io/badge/CSS-Primitive-informational)
> ![postgres](https://img.shields.io/badge/postgresql-10.0-blue?label=PostgreSQL&logo=postgresql)
> ![docker](https://img.shields.io/badge/3.3.0-blue?label=Docker&logo=docker)
> ![npm](https://img.shields.io/npm/v/express?color=black&label=Express&logo=node.js)
> ![npm](https://img.shields.io/npm/v/react?color=black&label=React&logo=react)
> ![npm](https://img.shields.io/npm/v/knex?color=black&label=Knex&logo=wolfram&logoColor=orange)
> ![](https://img.shields.io/badge/token-JWT-informational)
> ![](https://img.shields.io/badge/mail-mailtrap-informational)
> ![](https://img.shields.io/badge/cloud-cloudnary-informational)

## Summary
**We need you to build basically a CRUD of products of e-commerce with some requirements. Here are the user stories you need to follow to develop the application**

### User stories
-   As a user, I want to create a product with at least these fields: name, description, price and published_at :heavy_check_mark:
-   As a user, I want to upload one or more images to the product. :heavy_check_mark:
-   As a user, I want to list all the products I've created. :heavy_check_mark:   
-   As a user, I want to update and soft deletes a product. :heavy_check_mark:
-   As a user, I want to confirm my email to start using the application. :heavy_check_mark:
-   As a guest, I want to sign up and sign in to the application. :heavy_check_mark:
-   As a new user, I need to confirm my email address to start using the application. :heavy_check_mark:
### Requirements:
1.  Technologies you must use but not only: React, Typescript, Nodejs, PostgreSQL    
2.  All emails should be sent in background jobs not affecting user experience. You can use Mailtrap as a server for testing purposes.    
3.  You can use local or cloud storage for managing files.    
4.  You can use any frontend and backend frameworks you want like Next, Gatsby, Express, TailwindCSS, Bootstrap etc.    
5.  Don't use any pre-built template in ThemeForest or similar. You can use their design to get inspiration if you want, but do not use their files.    
6.  You can use pre-built components for Bootstrap or TailwindUI.    
7.  Don't worry too much about the UI/UX. Focus on the core features.    
8.  There are a lot more features in e-commerce but don't worry, do whatever you think it's important to complete those user stories.

## Improviment
Now the send mail function for validating account creation runs on a queue over Redis to avoid blocking in case of a third-party environment delayed.

## API
### Response Codes 
```
200: Success
201: Created
401: Unauthorized
400: Bad Request
50X: Server Error
```
### Endpoints
``` 
1. /login -> POST - Authentication
2. /users -> GET - List all registered users
3. /users -> POST - Create a new user
4. /confirm/:confirmationCode -> GET - E-mail confirmation
5. /products -> GET - List all products
6. /products -> POST - Create a new product
7. /products -> PUT - Edit a product
8. /products -> DELETE - Delete a product by it`s ID
```
## Frontend
### First view - Sign in / Sign up
![image](https://user-images.githubusercontent.com/21188945/114710855-a0e93480-9d04-11eb-8811-6623a44b8c75.png)
![image](https://user-images.githubusercontent.com/21188945/114710884-a8104280-9d04-11eb-9df7-20d76a8637ab.png)
### Home Dashboard
![image](https://user-images.githubusercontent.com/21188945/114710973-c5dda780-9d04-11eb-9b80-f0c95c1592f1.png)
### Create a new product
![image](https://user-images.githubusercontent.com/21188945/114710993-cfffa600-9d04-11eb-93dc-e7fe278e2b65.png)
### List all products
![image](https://user-images.githubusercontent.com/21188945/114711029-db52d180-9d04-11eb-9317-f7f1ccddcff2.png)
### List my products
![image](https://user-images.githubusercontent.com/21188945/114628071-ab67e780-9c8c-11eb-8368-875e385b4502.png)
### Edit a product
![image](https://user-images.githubusercontent.com/21188945/114711067-e574d000-9d04-11eb-846a-254e1d6e5d67.png)
### List all users
![image](https://user-images.githubusercontent.com/21188945/114711496-67fd8f80-9d05-11eb-971c-f057f9abc973.png)

## Next steps
```
1. API documentation with Swagger
2. Create unit tests
3. Remove images of an especific product
4. Remove users
5. Edit users
6. ...
```
