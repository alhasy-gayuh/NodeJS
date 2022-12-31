// core module
const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

// membuat folder data jika belum ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// membuat file JSON jika belum ada
const dataPath = './data/contacts.json'
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    
    return contacts;
}

const saveContact = (nama, email, noHp) => {
    const contact = {nama, email, noHp};
    // const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    // const contacts = JSON.parse(fileBuffer);

    const contacts = loadContact();


    // cek duplikasi nama
    const duplikat = contacts.find( (contact) => contact.nama === nama );
    if (duplikat) {
        console.log(chalk.red.inverse.bold('Nama sudah terdaftar, gunakan nama lain!!!'));
        return false;
    }

    // cek email
    if (email) {
        if (!validator.isEmail(email)) {
        console.log(chalk.red.inverse.bold('Email tidak valid!!!'));
        return false;
        }
    }

    // cek nomer HP
    if (noHp) {
        if (!validator.isMobilePhone(noHp, 'id-ID')) {
        console.log(chalk.red.inverse.bold('Nomer HP tidak valid!!!'));
        return false;
        }
    }

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log(chalk.blue.inverse.bold('Terimakasih telah memasukan data!'));

}

const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.green.inverse.bold('Daftar Contact : '))

    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
    })
}

const detailContact = (nama) => {
    const contacts = loadContact();

    // telusuri nama contact
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    if (!contact) {
        console.log(chalk.red.inverse.bold(`${nama} Tidak di Temukan !!!`));
        return false;
    }
    console.log(chalk.blue.inverse.bold('nama : ' + contact.nama));
    console.log(chalk.green.inverse.bold('no HP : ' + contact.noHp));
    if (contact.email) {
        console.log(chalk.yellow.inverse.bold('email : ' + contact.email));
    }

}

module.exports = {saveContact, listContact, detailContact}