import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
const render = require('dust-engine').render;
import App from '../client/components/App';
import services from './services';

const app = express();

app.use(express.static('dist/public'));

app.use('/robots.txt', (req, res)=>{
    res.status(404);
});

app.use('/react/', (req, res)=>{
    Promise.all([services.getHtml(), services.getCampaigns()]).then((values)=>{
        let html = values[0];
        let items = values[1].items;

        let jsxOut = renderToString(<App items={items} isLoading={false} />);
        html = html.replace('<div id="root"></div>', `<div id="root">${jsxOut}</div>`);
        //html = html.replace('<script type="text/javascript" src="client_bundle.js"></script>', '');
        res.send(html);
    }).catch(err=>{
        res.status(500).send(err.message);
    });
});

app.use('/dust/', (req, res) => {
    services.getCampaigns().then((campaigns) => {
        let items = campaigns.items;

        let filePath = path.join(__dirname, '../client/dust-index');

        render(filePath, { items : items, isLoading: false }, function (err, output) {
            if(err){
                res.status(500).send(err.message);
            }else{
                res.send(output);
            }
        });
    }).catch(err => {
        res.status(500).send(err.message);
    });
});

let port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('Application started on port '+ port);
});