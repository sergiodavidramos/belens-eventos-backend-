var express = require('express');

var app = express();

const path = require('path');
const fs = require('fs');

app.get('/:tipo/:img',(req,res)=>{

    var tipo = req.params.tipo;
    var img = req.params.img;

    var pathViejo = path.resolve(__dirname,`../uploads/${tipo}/${img}`);

    if(fs.existsSync(pathViejo)){
        res.sendFile(pathViejo);
    }else{
        var pathNoImage = path.resolve(__dirname, '../assets/no-img.jpg');
        res.sendFile(pathNoImage);
    }
});

module.exports = app;