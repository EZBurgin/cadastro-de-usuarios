import express from 'express'
import cors from 'cors'
const app = express()

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

app.get('/usuarios', async (req,res) => {
    const users = await prisma.user.findMany()
    
    res.status(200).json(users)
})

app.post('/usuarios', async (req, res) => {
    try {
        if (req.body.age < 18) throw new Error("Only allowed users over 18 years old")
            
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                age: req.body.age,
                name: req.body.name
            }
        })
   
            
        res.status(201).json(user)
    }catch(err) {
        res.status(400).json({error:err.message})
    }finally {
        console.log("Terminou tudo")
    }
       
})

app.put('/usuarios/:id', async (req,res) => {
    const user = await prisma.user.update({
        where : {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name
        }
    })

    res.status(201).json(user)
})

app.delete('/usuarios/:id', async (req,res) => {
    const user = await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({message : "Usuario deletado com sucesso"})
})

app.listen(3000)