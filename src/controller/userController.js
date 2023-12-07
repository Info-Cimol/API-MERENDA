const userModel=require("../model/userModel");
const cryptoJs = require('crypto-js');

exports.get= async (headers)=>{
  if(headers['perfil']!="admin"){
    return {status:"null",msg:"Operação não permitida", auth}
  }
  auth=await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  users={};
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=await userModel.get()
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  return resp;
}

exports.login= async (body)=>{
  return await userModel.login(body);
}

exports.alterarSenha= async (iduser, body) =>{ 
  const senhaAlterada = cryptoJs.MD5(body.senhaAlterada).toString();
  return await userModel.alterarSenha(iduser, senhaAlterada);
}