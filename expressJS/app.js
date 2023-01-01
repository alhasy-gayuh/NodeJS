const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express()
const port = 3000

app.get('/', (req, res) => {

    res.sendFile('./index.html', {root: __dirname});
});

app.get('/about', (req, res) => {
    res.sendFile('./about.html', {root: __dirname});
    
});

app.get('/produk/:id', (req, res) => {
    res.send(`Produk ID :  ${req.params.id} </br> Category ID : ${req.query.category}`);
})

app.get('/contact', (req, res) => {
    res.sendFile('./contact.html', {root: __dirname});

});

// dapat digunakan untuk menangani halaman yang tidak ada
app.use('/', (req, res) => {
    res.status(404)
    res.send('not found 404 ! ')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})