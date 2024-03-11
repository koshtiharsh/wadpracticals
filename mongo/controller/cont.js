const express = require('express')
const mongoose = require('mongoose')
const col = require('../model/model')
const router  = express.Router();

router.get('/',async(req,res)=>{
    const data = await col.find();

    res.json(data)

})

router.post('/insert',async(req,res)=>{

    const record = new col({
        name:req.body.name
    })

    await record.save();

})

router.put('/update',async(req,res)=>{

    const record = await col.findOneAndUpdate({name:'harsh'},{location:req.body.location});

    res.json({
        success:'done'
    })



})


router.delete('/delete/:name',async(req,res)=>{
    const record = await col.findOneAndDelete({name:req.params.name})
    
    if(record){
        res.json({success:"done"})
    }

})


module.exports = router;