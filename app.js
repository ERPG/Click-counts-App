const fs = require('fs')
const thereIsDotEnv = fs.existsSync('.env')
if ( thereIsDotEnv ) require('dotenv').config()

const app = require('./server/index');
const db = require('./server/db');

const dbURI = process.env.DB_URI || 'mongodb://localhost/click-counts-db';
const PORT = process.env.PORT || 3000

db.open(dbURI);
app.listen(PORT, () => console.log(`listening on PORT ${ PORT }...`))


