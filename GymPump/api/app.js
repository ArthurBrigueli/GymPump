const express = require('express')
const db  = require('./connection')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')


const app = express()
app.use(bodyParser.json());



app.get('/api/user', (req, res)=>{
    try{
        db.query('SELECT * FROM users', (erro, result)=>{
            if(erro){
                res.status(500).json({mensagem: 'erro'})
            }
            res.json(result)
        })
    }catch(erro){
        res.status(500).json({mensagem: 'erro interno'})
    }
})

app.delete('/api/delete/user/:id', (req, res)=>{
    const id = req.params.id

    try{
        db.query('DELETE FROM users WHERE id = ?', [id], (erro, result)=>{
            if(erro){
                res.status(500).json({mensagem: "erro ao deletar"})
            }
            res.send('deletado')
        })
    }catch(erro){
        console.log('erro')
    }

})


app.post('/api/register/user', async(req, res)=>{
    const {nome, email, senha} = req.body

    const bcryptPass = await bcrypt.hash(senha, 10)

    try{
        db.query('INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)', [nome, email, bcryptPass], (erro, result)=>{
            if(erro){
                res.status(500).json({mensagem: 'erro para inserir usuario'})
            }else{
                res.send('usuario inserido')
            }
        })
    
    }catch(error){
        console.log(error)
    }
})



app.listen(8000, ()=>{
    console.log('servidor iniciado')
})