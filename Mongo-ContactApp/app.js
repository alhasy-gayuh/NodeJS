const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const { body, validationResult, check } = require('express-validator');
const methodOverride = require('method-override');

require('./utils/db');
const Contact = require('./model/Contact')

const app = express();
const port = 3000;

// Setup MethodOverride
app.use(methodOverride('_method'))

// Setup EJS Layouts
app.set('view engine', 'ejs');
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

// Configurasi Flash
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));
app.use(flash())

// halaman home
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

// Halaman About
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        layout: 'layouts/main-layout',
    });
});

// Halaman Contact
app.get('/contact', async (req, res) => {
    const contacts = await Contact.find();

    res.render('contact', {
        title: 'Contact',
        layout: 'layouts/main-layout',
        contacts,
        msg: req.flash('msg'),
    });
});

// Halaman Tambah data Contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Tambah Contact',
        layout: 'layouts/main-layout',
    })
});

// Proses Menambahkan Data Contact
app.post('/contact', [
    body('nama').custom(async (value) => {
        const duplikat = await Contact.findOne({ nama: value });
        if (duplikat) {
            throw new Error('Nama sudah terdaftar!')
        }
        return true;
    }),
    check('email', 'Email tidak valid!').isEmail(),
    check('noHp', 'No HP tidak valid!').isMobilePhone('id-ID')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('add-contact', {
            title: 'Tambah Contact',
            layout: 'layouts/main-layout',
            errors: errors.array(),
        })
    } else {
        Contact.insertMany(req.body, (error, result) => {
            // kirimkan flash massage
            req.flash('msg', 'Data contact Berhasil di tambahkan!')
            res.redirect('/contact');
        })
    }
});

// Proses Delete Contact
app.delete('/contact', (req, res) => {
    Contact.deleteOne({ nama: req.body.nama }).then((result) => {
        req.flash('msg', 'Data contact berhasil di Hapus!');
        res.redirect('/contact');
    })
})

// Halaman Edit data
app.get('/contact/edit/:nama', async (req, res) => {
    const contact = await Contact.findOne({ nama: req.params.nama })
    res.render('edit-contact', {
        title: 'Edit Contact',
        layout: 'layouts/main-layout',
        contact,
    })
})

// Proses Update Data Contact
app.put('/contact', [
    body('nama').custom(async (value, { req }) => {
        const duplikat = await Contact.findOne({ nama: value });
        if (value !== req.body.oldNama && duplikat) {
            throw new Error('Nama sudah terdaftar!')
        }
        return true;
    }),
    check('email', 'Email tidak valid!').isEmail(),
    check('noHp', 'No HP tidak valid!').isMobilePhone('id-ID')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('edit-contact', {
            title: 'Update Contact',
            layout: 'layouts/main-layout',
            errors: errors.array(),
            contact: req.body,
        })
    } else {
        Contact.updateOne({ _id: req.body._id }, {
            $set: {
                nama: req.body.nama,
                email: req.body.email,
                noHp: req.body.noHp,
            },
        }
        ).then((result) => {
            // kirimkan flash massage
            req.flash('msg', 'Data contact Berhasil di Ubah!')
            res.redirect('/contact');
        })
    }
});


// Halaman Detail Contact
app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({ nama: req.params.nama });

    res.render('detail', {
        title: 'Detail Contact',
        layout: 'layouts/main-layout',
        contact,
    });
});

// menjalankan server
app.listen(port, () => {
    console.log(`server berjalan di http://localhost:${port}`);
})