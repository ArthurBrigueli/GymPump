const express = require('express')
const db  = require('./connection')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const SECRET_TOKEN = 'gympump1802arthur1423brigueli'


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
        
        db.query('SELECT * FROM users WHERE email = ?', [email], (error, result)=>{
            if(error){
                res.status(500).json({mensagem: "erro interno"})
            }else{
                if(result.length > 0){
                    res.status(400).json({error: 'Email ja cadastrado'})
                }else{
                    db.query('INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)', [nome, email, bcryptPass], (erro, result)=>{
                        if(erro){
                            res.status(500).json({mensagem: 'erro para inserir usuario'})
                        }else{
                            res.send('usuario inserido')
                        }
                    })
                }
            }
        })

    }catch(error){
        console.log(error)
    }
})


app.post('/api/login/user', (req, res)=>{
    const {nome, senha} = req.body

    db.query('SELECT * FROM users WHERE nome = ?', [nome], (erro, result)=>{
        try{
            if(erro){
                res.status(500).json({mensagem: 'erro login'})
            }

            const user = result[0]

            const payload = { userId: user.id, nome: user.nome, email: user.email };

            const token = jwt.sign(payload, SECRET_TOKEN)

            const userReturn = {
                id: user.id,
                nome: user.nome,
                email: user.email
            }

            res.json({token: token, user: userReturn})
        }catch(erro){
            res.json({mensagem: "credenciais incorreta"})
        }

    })
})



app.listen(8000, ()=>{
    console.log('servidor iniciado')
})