var express = require('express')
const app = express();
app.use(express.json())
var cors = require('cors')

// var corsOptions = {
//     origin: 'https://app.prodia.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
const path = require('path');
app.use(express.static(path.join(__dirname, 'templates')));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});
app.post('/create',function(req,res)
{
    var data = req.body
    console.log(data)
    let obj;
    let obj1;


    const url = 'https://api.prodia.com/v1/sd/generate';
    const options = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-Prodia-Key': data['server']
    },
    body: JSON.stringify({
        model: data['model'],
        prompt: data['name'],
        negative_prompt: 'badly drawn',
        steps: Number(data['steps']),
        cfg_scale: 7,
        seed: -1,
        upscale: false,
        sampler: 'DPM++ 2M Karras',
        width: Number(data['width']),
        height: Number(data['height']),
        
    })
    };
    foo()
    async function foo()
    {
        const resp = await fetch(url,options)
        
        obj = await resp.json()
        results()
    }

    
    async function results()
    {
    const url1 = `https://api.prodia.com/v1/job/${obj['job']}`;
    const options1 = {method: 'GET', headers: {accept: 'application/json', 'X-Prodia-Key': '7b6ad25b-f7ef-45a1-bc82-0f32de37d511'}};
        const res1 = await fetch(url1,options1)
        obj1 = await res1.json()
        if(obj1['status']=="succeeded")
            {
                res.send(obj1)
                
            }
        else{
            results()
        }
    }

    // foo()
    // results()
})
app.listen(3000,function(){
    console.log("Server is listening");
});
