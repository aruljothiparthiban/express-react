import path from 'path';
import fs from 'fs';

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

export default {
    getCampaigns,
    getHtml
};