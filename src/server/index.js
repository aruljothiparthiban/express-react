import express from 'express';
import path from 'path';
import engine from 'dust-engine';
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

app.use('/react/', async (req, res)=>{
    try{
        let values = await Promise.all([services.getHtml(), services.getCampaigns()]);
        let html = values[0];
        let items = values[1].items;

        let jsxOut = services.getReactHtml(items);

        //let jsxOut = renderToString(<App items={items} isLoading={false} />);
        html = html.replace('<div id="root"></div>', `<div id="root">${jsxOut}</div>`);
        res.send(html);
    }
    catch(err){
        res.status(500).send(err.message);
    }
});


app.use('/dust/', async (req, res) => {
    try{
        let campaigns = await services.getCampaigns();
        res.render('dust-index', {  items : campaigns.items, isLoading: false });
    }catch(err){
        res.status(500).send(err.message);
    }
});

app.use('/what-is-my-ip', (req, res)=>{
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    res.send(ip);
});

let port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('Application started on port '+ port);
});