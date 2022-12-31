// core module
const fs = require('fs');

const readeline = require('readline');
const rl = readeline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

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

const createQuest = (pertanyaan) => {
    return new Promise((resolve, rejects) => {
        rl.question(pertanyaan, (nama) => {
            resolve(nama);
        });
    });
}

const saveContact = (nama, email, noHp) => {
    const contact = {nama, email, noHp};
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log('Terimakasih telah memasukan data!');

    rl.close();
}

module.exports = {createQuest, saveContact}