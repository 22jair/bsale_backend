import { Request, Response } from "express";
import { Category } from "../entities/Category";

export class CategoryController {

  getCategories = async (req: Request, res: Response) => {
    try{
      
      const categories = await Category.find();
      return res.json({
        ok: true,
        data: categories
      });

    }catch(e){
      return res.status(500).json({
        message: "Error al obtener productos",
        error: e
      });
    }    
  }



}