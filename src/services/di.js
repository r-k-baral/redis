import { model, models } from "mongoose";


class ProductService {
    constructor(ProductService){
        this.ProductService = Product;

    }
    async getProducts(){
        return await this.Product.find()
    }
}
model.exports = ProductService



class ProductController {
    constructor(productService){
        this.productService = productService;
    }

    getProduct = async (req, res)=>{
try {
    const products = await this.productService.getProducts()
    res.status(200).json(products)
} catch (error) {
    res.status(500).json({
        message: error.message,
        error: error
    })
}
    }
}
moduls.exports = ProductController;


class nameofhting{
    constructor(carrate){
        this.carrate = carrate;
    }
    getCar = async (req, res)=>{
        const carrate = await this.carrate.getProducts()
        res.status(200).json({
            message:error.message,
            error: error
        })
    }



}

moduls.exports = nameofhting;

class productService{
    constructor(searchtask){
        this.searchtask= searchtask;

    }

    getService = async (req,res)=>{
       try {
         const products = await products.find()
        res.status(200).json({
            message:error.message,
        error:error        })
       } catch (error) {
        message: error.message
        error:error
       }
    }

    getProductbyId = async (req, res)=>{
      try {
         const{id} = req.params
         if(!id){
            return res.status(404).json({
                message: error.message,
                error:error
            })
        }
       const product = await products.findbyid(id)
       if(!product){
        return res.status(404).message({
            message:error.message,
            error: error
        })
       }
      } catch (error) {
        message: error.message
        error: error
      }
    }
    updateProduct = async (req, res)=>{
        try {
            const{id} = req.params;
        if(!id){
            return res.status(404).json({
                message: error.message,
                error:error
            })
        }
        const{name,and all the updated item that need to update } = req.body
        if(!validatae that all ){
            return res.status(404).json({
                message:error.message,
                error: error
            })
        }
        const UpdateProduct =  await products.findbyidandupdate( ifnd by id and update all as per data query it could mongo and postgrance any db )
        res.status(201).json({
            updated item,
            message:error.message,
            error:error
        })
        } catch (error) {
            message:error.message
            
        }
    }
}

moduls.exports = productService