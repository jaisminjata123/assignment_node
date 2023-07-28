module.exports = app => {
    const customerController = require("../controllers/customerController");
  
    var router = require("express").Router();
  
    // Create/Fetch
    router.post("/identify", customerController.identifyCustomer);
  
    app.use('/api/customer', router);
  };
  