const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'lcpbq9az4jklobvq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'purdj4ulqu5jhmu8',
    password: 'rxqaojr691z8pzj0',
    database: 'qxtxcklxoonziex4'

})

connection.connect((error) => {
    if(error){
        console.error('CONNECTION FAILED: ', error)
        return
    }
    console.log('Database Connection Succesful!')
})

module.exports = connection