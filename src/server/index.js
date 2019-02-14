import express from 'express';
import path from 'path';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../client/components/App';

const app = express();

app.use(express.static('dist/public'));

app.use('/', (req, res)=>{
    let filePath = path.join(__dirname, '../../dist/public/index.html');
    fs.readFile(filePath, 'utf-8', (err, html)=>{
        if(err){
            return res.status(500).send(err.message);
        }
        let jsxOut = renderToString(<App />);
        html = html.replace('<div id="root"></div>', `<div id="root">${jsxOut}</div>`);
        res.send(html);
    });
});

app.listen(3000, ()=>{
    console.log('Application started!');
});