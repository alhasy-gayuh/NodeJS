const express = require('express');
const port = 3000
const app = express()
const {loadContact, findContact, addContact, cekDuplikat} = require('./utils/contacts')
const { body, validationResult, check } = require('express-validator');

// express layouts
const expressLayouts = require('express-ejs-layouts')
// menggunakan EJS
app.set('view engine', 'ejs');

// Third-party Middleware
app.use(expressLayouts); // Menggunakan Express Layouts

// Built-in Middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));

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

app.get('/contact', (req, res) => {
    const contacts = loadContact();

    res.render('contact', {
        title: 'Contact',
        layout: 'layouts/main-layout',
        contacts,
    });
});

// halaman tambah data contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Tambah Contact',
        layout: 'layouts/main-layout',
    })
})

// proses menambahkan data contact
app.post('/contact', [
    body('nama').custom((value) => {
        const duplikat = cekDuplikat(value);
        if (duplikat) {
            throw new Error('Nama sudah terdaftar!')
        }
        return true;
    }),
    check('email', 'Email tidak valid!').isEmail(),
    check('noHp', 'No HP tidak valid!').isMobilePhone('id-ID')
], (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('add-contact', {
            title: 'Tambah Contact',
            layout: 'layouts/main-layout',
            errors: errors.array(),
        })
    //   return res.status(400).json({ errors: errors.array() });
    } else {
        addContact(req.body);
        res.redirect('/contact');
    }
})

// halaman detail contact
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    res.render('detail', {
        title: 'Detail Contact',
        layout: 'layouts/main-layout',
        contact,
    });
});

// dapat digunakan untuk menangani halaman yang tidak ada
app.use((req, res) => {
    res.status(404)
    res.send('not found 404 ! ')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})