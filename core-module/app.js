// core module
const fs = require('fs');

// menuliskakn file secara (sync)
// try{
// fs.writeFileSync('dtest.txt', 'Hello World Syncronous')
// } catch(e) {
//     console.log(e);
// }

// menulis file secara (Async)
// fs.writeFile('data/test.txt', 'Menulis Secara Asyncronous!', (err) => {
//     console.log(err);
// });

// membaca file secara (sync)
// const file = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(file);

// membaca file secara async
// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//     if(err) throw err;
//     console.log(data);
// })

const readeline = require('readline');
const rl = readeline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Masukan Nama Anda : ', (nama) => {
    rl.question('Masukan No. HP Anda : ', (nohp) => {
        const contact = {nama, nohp,};
        const file = fs.readFileSync('data/contacts.json', 'utf-8');
        const contacts = JSON.parse(file);
        
        // kalau suddah berubah menjadi format json, tinggal di push
        contacts.push(contact);

        // setelah terbaca, selanjutnya baru kita masukan kedalam file json
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

        console.log('Terimakasih sudah memasukan data')
        
        rl.close();
    })
});  