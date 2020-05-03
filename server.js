const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now  = new Date().toString();
    var log = `${now}: ${req.method} => ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Failed to append to file server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    // res.send('<H1>Hello World!</H1>');
    // res.send({
    //     name: 'Shubham Indrawat',
    //     age: '23',
    //     hobbies: [
    //         'Coding',
    //         'Cooking'
    //     ]
    // });
    res.render('home.hbs', {
        title: 'Home Page',
        message: 'Hello World! How are you'
    });
});

app.get('/about', (req, res) => {
    // res.send('<H1>About Us</H1>');
    res.render('about.hbs', {
        title: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send('Some error');
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});