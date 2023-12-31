const cardapioModel = require('../model/cardapioModel');
const userModel = require('../model/userModel');

exports.get=async (headers) =>{
    auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
    if(headers.iduser==auth.idUser){
        resp= await cardapioModel.get();
    }else{
        resp= {"status":"null", auth}
    }

    return resp;
}

exports.busca=async (headers) =>{
    auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
    if(headers.iduser == auth.idUser){
        resp= await cardapioModel.busca(headers.iduser);
    }else{
        resp= {"status":"null", auth}
    }

    return resp;
}

exports.reservar=async (headers, idCardapio, body) =>{
    auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
    if(headers.iduser == auth.idUser){
        const verificaReserva = await cardapioModel.verificaReserva(auth.idUser, idCardapio, body.turno);
        if(verificaReserva === true){
            resp = await cardapioModel.removerReserva(auth.idUser, idCardapio, body.turno);
        }else{
            resp= await cardapioModel.reservar(auth.idUser, idCardapio, body.turno);
        }
    }else{
        resp= {"status":"null", auth}
    }

    return resp;
}

exports.cadastrar=async (headers, body) =>{
    auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
    if(headers.iduser == auth.idUser){
        resp= await cardapioModel.cadastrar(body);
    }else{
        resp= {"status":"null", auth}
    }

    return resp;
}

exports.deletar=async (headers, idCardapio) =>{
    auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
    if(headers.iduser == auth.idUser){
        resp= await cardapioModel.deletar(idCardapio);
    }else{
        resp= {"status":"null", auth}
    }

    return resp;
}

exports.editar=async (headers, idCardapio, body) =>{
    console.log("idCardapio "+idCardapio)
    console.log(body);
    console.log(headers.iduser);
    auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
    if(headers.iduser == auth.idUser){
        resp= await cardapioModel.editar(idCardapio, body);
    }else{
        resp= {"status":"null", auth}
    }

    return resp;
}