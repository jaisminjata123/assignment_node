const db = require("../config/dbConnection");
const customerModel = db.customerModel;
const Op = db.Sequelize.Op;
const response = require("../controllers/responseController");
const customerService = require("../services/customerService");


module.exports.identifyCustomer = async(req,res)=>{
  try {
    let result = await customerService.identifyCustomer(req.body);
    return response(req, res, result);
    
  } catch (error) {
    console.log(error)
    res.status(error.status).send({
      status: false,
      message: "Bad Request Data",
      message_key: "error_key",
    });
  }
}
