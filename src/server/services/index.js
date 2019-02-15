import path from 'path';
import fs from 'fs';

const getCampaigns = ()=>{
    return new Promise((resolve, reject)=>{
        let filePath = path.join(__dirname, '../../../dist/public/data/campaign.json');
        fs.readFile(filePath, 'utf-8', (err, result)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(JSON.parse(result));
        });
    });
};

const getHtml = ()=>{
    return new Promise((resolve, reject)=>{
        let filePath = path.join(__dirname, '../../../dist/public/client.html');
        fs.readFile(filePath, 'utf-8', (err, html)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(html);
        });
    });
};

export default {
    getCampaigns,
    getHtml
};