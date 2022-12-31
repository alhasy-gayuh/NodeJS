// core module
const fs = require('fs');
const chalk = require('chalk');

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

const saveContact = (nama, email, noHp) => {
    const contact = {nama, email, noHp};
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);

    // cek duplikasi nama
    const duplikat = contacts.find( (contact) => contact.nama === nama );
    if (duplikat) {
        console.log(chalk.red.inverse.bold('Nama sudah terdaftar, gunakan nama lain!'));
        return false;
    }

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log('Terimakasih telah memasukan data!');

}

module.exports = {saveContact}