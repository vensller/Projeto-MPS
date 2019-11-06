const mongoose = require('../database');

const CompanySchema = mongoose.Schema({
    company:{
        type: String,
    },
    password:{
        type: String,
    },
    classification:{
        type: String,
    },
    comments: {
        type: Array
    },
    messages: {
        type: Array
    }
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;