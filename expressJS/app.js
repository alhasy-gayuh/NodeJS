const express = require('express');
const app = express()
const port = 3000

// express layouts
const expressLayouts = require('express-ejs-layouts')

// menggunakan EJS
app.set('view engine', 'ejs');

app.use(expressLayouts);

app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'Gayuh',
            email: 'gayuh@gmail.com'
        },
        {
            nama: 'anisa',
            email: 'anisa@gmail.com'
        },
        {
            nama: 'angel',
            email: 'angel@gmail.com'
        },
    ]

    res.render('index', 
    {
        nama: 'Gayuh', 
        title: 'Home',
        layout: 'layouts/main-layout',
        mahasiswa,
    }
    );
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        layout: 'layouts/main-layout',
    });
});

app.get('/produk/:id', (req, res) => {
    res.send(`Produk ID :  ${req.params.id} </br> Category ID : ${req.query.category}`);
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact',
        layout: 'layouts/main-layout',
    });
});

// dapat digunakan untuk menangani halaman yang tidak ada
app.use('/', (req, res) => {
    res.status(404)
    res.send('not found 404 ! ')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})