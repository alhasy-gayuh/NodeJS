// membuat contact app secara commandline interface 
const yargs = require('yargs');
const contacts = require('./contacts');

yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Alamat Email',
            demandOption: false,
            type: 'string',
        },
        noHp: {
            describe: 'No. Handphone',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.saveContact(argv.nama, argv.email, argv.noHp);
    }
}).demandCommand();

// Menampilkan list contact
yargs.command({
    command: 'list',
    describe: 'Melihat list contact',
    handler() {
        contacts.listContact();
    }
})

// menampilkan detail contact
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail contact',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
            contacts.detailContact(argv.nama);
        },
})

// menghapus contact berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
            contacts.deleteContact(argv.nama);
        },
})

yargs.parse();