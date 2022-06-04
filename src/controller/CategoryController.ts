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

  getCategoryById = async (req: Request, res: Response) => {
    try{
      let { id } = req.params;   
      
      if(isNaN(Number(id))){
        return res.status(400).json({
          ok: false,
          message: "Id inválido"          
        });
      }
      
      const category = await Category.findOne({ where : { id: Number(id) }, relations: ["products"] });
      return res.json({
        ok: true,
        data: category
      });

    }catch(e){      
      return res.status(500).json({
        message: "Error al obtener categoria, contacte al administrador"
      });
    }

  }

}