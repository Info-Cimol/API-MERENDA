const express = require('express')
const userRouter = express.Router(); 
const cardapioController = require('../controller/cardapioController');

userRouter.get('/', async(req, res, next)=>{
    cardapio=await cardapioController.get(req.headers);
    res.status(200).send(cardapio);
})

userRouter.get('/reservas', async(req, res, next)=>{
    reservas=await cardapioController.busca(req.headers);
    res.status(200).send(reservas);
})

userRouter.post('/reservar/:idCardapio', async(req, res, next)=>{
    reservar=await cardapioController.reservar(req.headers, req.params.idCardapio, req.body);
    res.status(200).send(reservar);
})

userRouter.post('/cadastrar', async(req, res, next)=>{
    cadastrar=await cardapioController.cadastrar(req.headers, req.body);
    res.status(200).send(cadastrar);
})

userRouter.delete('/deletar/:idCardapio', async(req, res, next)=>{
    deletar=await cardapioController.deletar(req.headers, req.params.idCardapio);
    res.status(200).send(deletar);
})

userRouter.put('/editar/:idCardapio', async(req, res, next)=>{
    user=await cardapioController.editar(req.headers, req.params.idCardapio, req.body);
    res.status(200).send(user)
  })

module.exports=userRouter;