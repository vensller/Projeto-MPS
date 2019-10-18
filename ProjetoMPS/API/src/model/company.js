const mongoose = require('../database');

const CompanySchema = mongoose.Schema({
    company:{
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