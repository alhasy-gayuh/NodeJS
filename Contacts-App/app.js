const contacts = require('./contacts')

const main = async () => {
    const nama = await  contacts.createQuest('Masukan nama anda : ');
    const email = await contacts.createQuest('Masukan email anda : ');
    const noHp = await  contacts.createQuest('Masukan noHp anda : ');

    contacts.saveContact(nama, email, noHp );

}

main();

