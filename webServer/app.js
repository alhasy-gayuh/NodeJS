const http = require('http');
const port = 3030
const fs = require('fs');

const renderHTML = (path, res) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(404)
            res.write('Error: file not found!')
        } else {
            res.write(data);
        }
        res.end();
    })
}

http
    .createServer((req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/html',
        })

        const url = req.url;

    // DENGAN SWITCH CASE
    switch (url) {
        case '/about':
            renderHTML('./about.html', res)
            break;
        case '/contact':
            renderHTML('./contact.html', res)
        default:
            renderHTML('./index.html', res)
            break;
    }


    // DENGAN IF ELSE
        // tampilkan halaman about
    //     if (url === '/about') {
    //         renderHTML('./about.html', res);

    //         // menampilkan contact
    //     } else if (url === '/contact') {
    //         renderHTML('./contact.html', res);

    //     } else {

    //         // menampilkan Halaman Index.html dengan readFile
    //         renderHTML('./index.html', res);

    //     }


    })
    .listen(port, () => {
        console.log(`Server is listening on port ${port}..`)
    })