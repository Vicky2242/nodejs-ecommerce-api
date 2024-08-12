const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');

//createorder - /api/v1/order
exports.createOrder =async(req, res, next) =>{
    const cartItems = req.body;
    const amount = Number(cartItems.reduce((acc, item)=>(acc + item.product.price * item.qty), 0)).toFIxed(2);
    const status = 'pending';

    const order = await orderModel.create({cartItems, amount, status})

    // updating product stock
    cartItems.forEach(async(item)=>{
        productModel.findById(item.product._id);
        product.stock = product.stock - item.qty;
        await product.save();
    })
    res.json(
        {
            success:true,
            order
        }
    )
}