// Importiamo il modulo express
const express  = require('express');

// Importiamo il modulo faker js
const { faker } = require('@faker-js/faker');

// Importiamo il db creato da db.js
const db = require('./db');

const cors = require('cors'); // Importiamo il modulo cors per gestire le richieste cross-origin

// Istanziamo un oggetto express, che rappresenta la nostra app
// così possiamo definire le rotte, gestire le richieste e le configurazioni
const app = express();

// Abilitiamo CORS per tutte le rotte
app.use(cors());

// Specifichiamo delle origini specifiche 
app.use(cors({
  origin: 'http://localhost:4200', // Your Angular app URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Specifichiamo la porta sulla quale il server ascolterà le richieste
const PORT = 8300;

// Definiamo un middleware che verrà eseguito per ogni richiesta ricevuta dal server
// Questo è utile per poter fare logging o eseguire controlli specifici

// req.method è il metodo HTTP della richiesta (GET, POST, HEAD, ...)
// req.url è l'URL della richiesta
// next() è una funzione che chiama il prossimo middleware o la prossima rotta.

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Esegue il parsing in application/json
app.use(express.json());

// Possiamo mantenere spazi e caratteri speciali tramite l'encoding (x-www-form-urlencoded)
app.use(express.urlencoded({extended: true}));

// Definiamo la rotta di default (avverrà quando l'url è uguale a http://localhost:3000)

app.get('/', (req, res) => {
    res.send('Ciao dal server Express!');
});

app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) return next(err);
        res.json(rows);
    });
});

app.get('/user/:id', (req, res) => {

    const userId = req.params.id; // recupera l'id dalla URL

    db.get(`SELECT * FROM users WHERE id = ?`, [userId], (err, row) =>{
        if (err) return next(err);

        if (!row)
            res.status(404).json({error: 'Id non trovato'});
        else
            res.json(row);
    });
});

app.get('/otp', (req, res) => {
    res.json(faker.number.int(({ min: 10000, max: 99999 })));
});

// POST per aggiungere un nuovo utente
app.post('/addUser', async (req, res) => {
    // 1. Validazione dei dati in input
    console.log(req.body); // Logga l'intero oggetto ricevuto
    const { name, email } = req.body;
    console.log(name, email); // Logga i dati ricevuti
    if (!name || !email) {
        return res.status(400).json({ 
            error: 'Nome ed email sono campi obbligatori',
            received: req.body
        });
    }
    if (!email.includes('@')) {
        return res.status(400).json({ error: 'Formato email non valido' });
    }
    try {
        // 2. Verifica se l'email esiste già
        const existingUser = await new Promise((resolve, reject) => {
            db.get('SELECT id FROM users WHERE email = ?', [email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        if (existingUser) {
            return res.status(409).json({ error: 'Email già registrata' });
        }

        // 3. Inserimento nel database
        const result = await new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [name, email || null],
            function(err) {
                if (err) reject(err);
                resolve(this.lastID); // Restituisce l'ID generato
            }
            );
        });

        // 4. Risposta di successo
        res.status(201).json({ 
            message: 'Utente creato con successo',
            id: result,
            user: { name, email }
        });

        console.log(`Nuovo utente creato: ID ${result}`);

    } catch (err) {
        console.error('Errore database:', err);
        res.status(500).json({ error: 'Errore interno del server' });
    }
});

app.post('/login', async(req, res) => {
    console.log(req.body);

    try{

    const name = req.body.name;
    const email = req.body.email;

    if(!name || !email)
        return res.status(400).json({message: 'Username ed email sono richiesti'});

    db.get('SELECT * FROM users WHERE name = ? AND email = ?', [name, email], async (err, user) => {
        if (err){
            return res.status(500).json({message: 'Errore del server'});
        }

        if (!user) {
            return res.status(401).json({message: 'Credenziali non valide!'});
        }

        console.log(user);

        res.json({
            message: 'Login effettuato con successo',
            user: {id: user.id, name: user.name, email: user.email}
        });

    });
    } catch(error){
        res.status(500).json({message: 'Errore del server'});
    }
});

app.post('/signin', async(req, res) => {
    console.log(req.body);

    try
    {
        const name = req.body.name;
        const email = req.body.email;

        if(!name || !email)
            return res.status(400).json({message: 'Username ed email sono richiesti'});

        const userExists = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE name = ? OR email = ?', [name, email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        // Controlliamo se l'utente esiste
        if(userExists){
            return res.status(409).json({
                success:false,
                message: 'Username o email già in uso'
            });
        }

        // Inseriamo l'utente
        const result = await new Promise((resolve, reject) => {
            db.run('INSERT INTO users (name, email) VALUES (?, ?)',
                [name, email],
                function(err){
                    if (err) reject(err);
                    resolve(this);
                }
            );
        });

        res.status(201).json({ 
            success: true,
            message: 'Utente registrato con successo',
            user: { id: result.lastID, name, email }
        });

    } catch(error)
    {
        console.error('Errore registrazione:', error);
        res.status(500).json({ 
            success: false,
            message: 'Errore durante la registrazione' 
        });
    }
});

// Avviamo il server specificando la porta
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});