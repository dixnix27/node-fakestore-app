const Product = require("../product/model")

const validateProduct = (req,res,next) =>{
    const {title,price} = req.body;

    if(!title || !price){
        return res.status(404).json({message: "Missing required fields"})
    }else{
        next();
    };
}

const validateProductId = (req,res,next)=>{
    const {id} = req.params;

    Product.findById(id).exec().then((product)=>{
        if(!product){
            return res.status(404).json({message:"Not Found"})
        } else {
            next();
        }
    })

}

module.exports={validateProduct,validateProductId}