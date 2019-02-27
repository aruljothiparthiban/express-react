import path from 'path';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../../client/components/App';

const DATA = {
    CAMPAIGNS : null,
    HTML : null
};

const getCampaigns = ()=>{
    return new Promise((resolve, reject)=>{
        try{
            if(DATA.CAMPAIGNS === null){
                let filePath = path.join(__dirname, '../../../dist/public/data/campaign.json');
                DATA.CAMPAIGNS = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            }
            return resolve(DATA.CAMPAIGNS);
        }
        catch(err){
            return reject(err);
        }
    });
};

const getHtml = ()=>{
    return new Promise((resolve, reject)=>{
        try{
            if(DATA.HTML === null){
                let filePath = path.join(__dirname, '../../../dist/public/client.html');
                DATA.HTML = fs.readFileSync(filePath, 'utf-8');
            }
            return resolve(DATA.HTML);
        }
        catch(err){
            return reject(err);
        }
    });
};

const cache = [];

const getReactHtml =(items)=> {
    let itemsStr = JSON.stringify(items);
    let html = '';
    if(cache.length === 5){
        cache.shift();
    }
    for(let i=0; i <cache.length; i++){
        if(cache[i].key === itemsStr){
           return cache[i].html;
        }
    }
    html = renderToString(<App items={items} isLoading={false} />);
    cache.push({
        key: itemsStr,
        html
    });
    return html;
}

export default {
    getReactHtml,
    getCampaigns,
    getHtml
};