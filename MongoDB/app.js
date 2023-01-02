const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const dbName = "testing";

// Membuat Client Baru
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect((error, client) => {
    if (error) {
        return console.log('koneksi gagal!')
    }

    // pilih databasenya
    const db = client.db(dbName);

    // Menambahkan 1 data ke collections mahasiswa
    db.collection('mahasiswa').insertOne({nama: 'fajar', email: 'fajar@gmail.com'}, (error, result) => {
        if (error) {
            return console.log('gagal menambahkan data');
        }
        console.log(result);
    })
    
});