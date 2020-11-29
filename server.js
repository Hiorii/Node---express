const express = require('express');
const app = express();
const path = require('path');

app.use((req,res,next)=>{
    res.show = (name) => {
        res.sendFile(path.join(__dirname, `/views/${name}`))
    };
    next();
});

app.use('/user',(req,res,next) => {
   res.send('You have login to see this context');
   next();
});

app.use(express.static(path.join(__dirname, '/public')));

app.get('/',(req,res)=>{
    res.show('home.html');
});

app.get('/about',(req,res)=>{
    res.show('about.html');
});

app.get('/user/settings',(req,res)=>{
    res.show('settings.html');
});

app.get('/user/panel',(req,res)=>{
    res.show('panel.html');
});

app.use((req,res)=> {
    res.status(404).show('error.html');
})

app.listen(8000, ()=> {
    console.log("Connected with server");
});