const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'estacionamiento'

})

connection.connect((error) => {
    if(error){
        console.error('CONNECTION FAILED: ', error)
        return
    }
    console.log('Database Connection Succesful!')
})

module.exports = connection