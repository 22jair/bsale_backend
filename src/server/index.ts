import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { AppDataSource } from '../config/typeorm-config';
import productRoutes from '../routes/v1/product.routes';
import categoryRoutes from '../routes/v1/category.routes';
import path from 'path';

export default class Server{

  public app = express();
  public port = process.env.PORT || 3000;
  public paths = {
    product:    '/api/v1/product',
    category :  '/api/v1/category',
  };

  constructor(){

    this.connectDb();

    this.middlewares();

    this.routes();    
  }

  async connectDb(){
    await AppDataSource.initialize();
    console.log('DB connected');
  }

  middlewares(){

    /* 
    * Morgan
    * Logger de peticiones
    */    
    this.app.use(morgan('dev'));

    /* 
    * Cors
    * Permite peticiones desde cualquier origen, es configurable
    */
    this.app.use( cors() );

    /* 
    * Public folder
    */
    this.app.use(express.static(path.join(__dirname, './../public')));

    /*
     * Body Parser
     * Permite recibir peticiones con cuerpo de datos
    */
    this.app.use( express.json() );
    
  }

  routes(){
    this.app.use( this.paths.product, productRoutes);
    this.app.use( this.paths.category, categoryRoutes);
  }
  
  listen(){    
    this.app.listen(this.port, () => {
      console.log('Server on port', this.port);
    })
  }

}