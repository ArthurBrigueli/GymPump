const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1802',
    database: 'gympump'
})


connection.connect((error)=>{
    if(error){
        console.log('erro para conectar')
    }

    console.log('conectado com sucesso')
})


module.exports = connection