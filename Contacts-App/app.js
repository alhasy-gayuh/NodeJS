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
    handler(argv){
        contacts.saveContact(argv.nama, argv.email, argv.noHp);
    }
}).demandCommand();

// Menampilkan detail contact
yargs.command({
    command: 'list',
    describe: 'Melihat list contact',
    handler(){
        contacts.listContact();
    }
})

yargs.parse();