const mysql=require('./mysqlConnect');

get=async()=>{
    return await mysql.query('SELECT id_cardapio, data, nome, descricao, reservas FROM cardapio');
}

busca=async(idUser)=>{
    sql= "SELECT cardapio.* FROM cardapio "+ 
    "INNER JOIN reserva ON cardapio.id_cardapio = reserva.id_cardapio "+
     "WHERE reserva.aluno_id ="+idUser;
    
    let busca = await mysql.query(sql);
    return busca;
}

reservar=async(iduser, idCardapio)=>{

    sql= "INSERT INTO reserva (id_cardapio, aluno_id) VALUE ('"+idCardapio+"','"+iduser+"')";

    let reservar = await mysql.query(sql);
    console.log(reservar);

    if(reservar){
        const reservado = "UPDATE cardapio SET reservas = reservas +1 WHERE id_cardapio = '"+idCardapio+"'"
        const resultado = await mysql.query(reservado);
        if(resultado.affectedRows){
            return {
                success: true,
                msg: "Reservado com sucesso"
            };
        }else{
            return{
                success: false, 
                msg: 'Erro ao reservar.'
            };
        
        }
    }
    

}

cadastrar=async(data)=>{
    sql="INSERT INTO cardapio (data, nome, descricao) VALUE ('"+data.data+"','"+data.nome+"','"+data.descricao+"')"
    console.log("data "+data.data);
    let cadastrar = await mysql.query(sql);
    if(cadastrar.affectedRows > 0){
        return {
            success: true,
            msg: "Registro incluido com sucesso",
            cadastrar
        }
    }else{
        return{
           success: false, 
           msg: 'Erro ao inserir dados.'
        }
    }
}

verificaReserva = async (iduser, idCardapio)=>{
    sql = "SELECT * FROM reserva WHERE aluno_id = '"+iduser+"' AND id_cardapio = '"+idCardapio+"'";
    const resultado = await mysql.query(sql);
    if(resultado.length > 0){
        return true;
    }else{
        return false;
    }
}

removerReserva = async (iduser, idCardapio)=>{
    sql = "DELETE FROM reserva WHERE aluno_id = '"+iduser+"' AND id_cardapio = '"+idCardapio+"'";
    const remocao = mysql.query(sql);
    if(remocao){
        const reservado = "UPDATE cardapio SET reservas = reservas -1 WHERE id_cardapio = '"+idCardapio+"' AND reservas > 0"
        const resultado = await mysql.query(reservado);
        if(resultado){
            return remocao;
        }
    }
}

deletar = async (idCardapio)=>{
    sql = "DELETE FROM cardapio WHERE id_cardapio = '"+idCardapio+"'";
    const deletar = await mysql.query(sql);
    console.log(deletar)
    if(deletar.affectedRows > 0){
        return{
            success: true,
            msg: "Cardápio deletado com sucesso",
        }
    }else{
        return{
            success: false,
            msg: "Erro ao deletar cardápio"
        }
    }
}

module.exports={get,busca,reservar,removerReserva,verificaReserva,deletar,cadastrar};