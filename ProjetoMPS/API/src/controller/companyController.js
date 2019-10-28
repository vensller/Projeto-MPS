const express = require('express');
const Company = require('../model/company');
const mongoose = require('../database');
const router = express.Router();

router.put('/', async(req, res) => {
    const company = req.body;

    if (!company)
        return res.status(400).send({error: "The company need a description"});
    try{
        const company = await Company.create(req.body);
        return res.status(201).json(company);
    }catch(err){
        return res.status(500).json({error: "Company registration failed!"});
    }
});

router.get('/', async(req, res) => {
    try{
        var companies = mongoose.model('Company');
        companies.find(function(err, allCompanies){
            for( let i = 0; i < allCompanies.length; i++ ){
                let average = 0.0;
                let actualCompany = allCompanies[i];
                for( let j = 0; j < actualCompany.comments.length; j++ ){
                    average += actualCompany.comments[j].rate;
                }
                if( average != 0.0 ){
                    average /= actualCompany.comments.length;
                }
                let newCompany = {
                    "_id" : actualCompany._id,
                    "company":actualCompany.company,
                    "classification":actualCompany.classification,
                    "rate":average,
                    "comments":actualCompany.comments
                }
                allCompanies[i] = newCompany;
            }
            res.status(200).json(allCompanies);
        });
    }catch(err){
        return res.status(500).json({error: err});
    }
});

router.post("/",async function(req,res){    
    var newData = {
        "company": req.body.company,
        "classification": req.body.classification,
        "comments": req.body.comments
    };
    
    var companies = mongoose.model('Company');
    
    const finded = await companies.findByIdAndUpdate(req.body._id, newData, {useFindAndModify: false});
    if (finded){
        console.log(finded);
        res.status(201).json(finded);        
    }
    else res.status(400).json({error: "error"});
});

module.exports = app => app.use('/company', router);
