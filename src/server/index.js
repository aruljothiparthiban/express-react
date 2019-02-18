import express from 'express';
import path from 'path';
import React from 'react';
import engine from 'dust-engine';
import { renderToString } from 'react-dom/server';
import App from '../client/components/App';
import services from './services';

const app = express();

app.engine('dust', engine.renderForExpress);
app.set('view engine', 'dust');
app.set('views', path.join(__dirname,'../client'));
app.disable('view cache');

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
        res.setHeader('Cache-Control', 'no-cache');
        res.send(html);
    }).catch(err=>{
        res.status(500).send(err.message);
    });
});


app.use('/dust/', (req, res) => {
    services.getCampaigns().then((campaigns) => {
        res.setHeader('Cache-Control', 'no-cache');
        res.render('dust-index', {  items : campaigns.items, isLoading: false });
    }).catch(err => {
        res.status(500).send(err.message);
    });
});

let port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('Application started on port '+ port);
});