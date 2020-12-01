const express = require('express');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use('/user',(req,res,next) => {
   res.send('You have login to see this context');
   next();
});

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));

app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/about',(req,res)=>{
    res.render('about', {layout: 'dark'});
});

app.get('/contact',(req,res)=> {
    res.render('contact');
});

app.get('/info',(req,res)=> {
    res.render('info');
});

app.get('/history',(req,res)=> {
    res.render('history');
});

app.get('/user/settings',(req,res)=>{
    res.render('settings');
});

app.get('/user/panel',(req,res)=>{
    res.render('panel');
});

app.get('/hello/:name',(req,res)=>{
    res.render('hello', {name: req.params.name});
});

app.post('/contact/send-message', (req, res) => {
    const { author, sender, title, file, message } = req.body;
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    const fileExtension = file.split('.').pop().toLowerCase();

    if(!author || !sender || !title || !file || !message) {
        res.render('contact', {isError: true});
    }else {
        if(allowedExtensions.includes(fileExtension)) {
            res.render('contact', {isSent: true, file: file});
        }
        else {
            res.render('contact', { file: file, isValid: true });
        }
    }
});

app.use((req,res)=> {
    res.status(404).render('error');
})

app.listen(8000, ()=> {
    console.log("Connected with server");
});