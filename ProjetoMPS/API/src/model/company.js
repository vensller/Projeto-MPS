const mongoose = require('../database');

const CompanySchema = mongoose.Schema({
    description:{
        type: String,
    },
    classification:{
        type: String,
    },
    comments: {
        type: Array
    }    
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;