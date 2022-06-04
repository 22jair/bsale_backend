import { Request, Response } from "express";
import { Like } from "typeorm";
import { Product } from "../entities/Product";

const sortType: any = {
  id: "id",
  name: "name",
  price: "price",
  discount: "discount"
};

export class ProductController {

  getProducts = async (req: Request, res: Response) => {
    try{
      
      const apiUrlRef = req.protocol + '://' + req.get('host') + req.originalUrl;
      const sort:any = req.query.sort || "id";
      const search:any = req.query.search || "";
      const category:any = req.query.category || "";

      let {  limit = 10, page = 1, order="ASC" } = req.query;

      if(sort.length > 0 && !sortType[sort]){
        throw new Error("Sort inválido, debe ser uno de los siguientes: " + Object.keys(sortType).join(', '));
      }

      if(isNaN(Number(limit)) || isNaN(Number(page))){
        throw new Error("Parámetros inválidos, limit, page deben ser números");
      } 
      
      limit = Number(limit);  
      page = Number(page);     
      const offset = limit * (page - 1);

      let options =  {
        where: {},
        relations: ["category"],
        order: { [sortType[sort]]: order},
        skip: offset,
        take: limit
      }
      
      if(!isNaN(Number(category)) && category != undefined){
        options.where = { category: { id: Number(category) } };
      }

      if(search.length > 0){
        options.where = { name: Like(`%${search}%`) };
      }

      const [data, total] = await Product.findAndCount(options);

      const mapData = data.map(item => {
        return {
          ...item,
          priceWithDiscount: item.price - (item.price * (item.discount / 100)),
          isDiscount: (item.discount > 0)
        }
      });
      
      return res.json({ 
        ok: true, total, page, limit, category,
        order, apiUrlRef, data:mapData
       });

    }catch(err){
      
      // LOG ERROR - CONSOLE (HEROKU, AWS...)
      console.log("LOG-ERROR: ", err);   
      if(err instanceof Error){
        return res.status(400).json({
          ok:false, 
          message: err.message 
        });
      }
      return res.status(500).json({
        ok:false,
        message: "Error al obtener productos"
      });

    }    
  }

  getProductById = async (req: Request, res: Response) => {    
    try{
      
      let { id } = req.params;   
      
      if(isNaN(Number(id))) throw new Error("Id inválido");      
      
      const product = await Product.findOne({ 
        where : { id: Number(id) },
        relations: ["category"]
      });      
      
      if(!product) throw new Error("Producto no encontrado");
      
      return res.json({ ok: true, data: product });

    }catch(err){

      // LOG ERROR - CONSOLE (HEROKU, AWS...)
      console.log("LOG-ERROR: ", err);      
      if(err instanceof Error){
        return res.status(400).json({
          ok:false, 
          message: err.message 
        });
      }

      return res.status(500).json({
        ok:false,
        message: "Error al obtener producto"
      });

    }
  }

  getTopDiscountProducts = async (req: Request, res: Response) => {
    try{
      
      const [data, total] = await Product.findAndCount({
        order: { discount: "DESC" },
        relations: ["category"],
        take: 5
      });

      const mapData = data.map(item => {
        return {
          ...item,
          priceWithDiscount: item.price - (item.price * (item.discount / 100))
        }
      });
      
      return res.json({ 
        ok: true,
        data: mapData
       });

    }catch(err){
      
      // LOG ERROR - CONSOLE (HEROKU, AWS...)
      console.log("LOG-ERROR: ", err);   
      if(err instanceof Error){
        return res.status(400).json({
          ok:false, 
          message: err.message 
        });
      }
      return res.status(500).json({
        ok:false,
        message: "Error al obtener productos"
      });

    }    
  }

}