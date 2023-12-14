const mysql=require('./mysqlConnect');

get=async()=>{
    return await mysql.query(`
        SELECT 
            c.id_cardapio, 
            c.data, 
            c.nome, 
            c.descricao, 
            c.reservas, 
            COALESCE(manha_count, 0) AS manha_count,
            COALESCE(tarde_count, 0) AS tarde_count,
            COALESCE(noite_count, 0) AS noite_count
        FROM cardapio c
        LEFT JOIN (
            SELECT 
                id_cardapio,
                COUNT(CASE WHEN turno = 'manha' THEN 1 END) AS manha_count,
                COUNT(CASE WHEN turno = 'tarde' THEN 1 END) AS tarde_count,
                COUNT(CASE WHEN turno = 'noite' THEN 1 END) AS noite_count
            FROM reserva
            GROUP BY id_cardapio
        ) r ON c.id_cardapio = r.id_cardapio
    `);
}

busca=async(idUser)=>{
    sql= "SELECT cardapio.*, reserva.turno FROM cardapio "+
    "INNER JOIN reserva ON cardapio.id_cardapio = reserva.id_cardapio "+
    "WHERE reserva.aluno_id ="+idUser
    
    let busca = await mysql.query(sql);
    return busca;
}

reservar=async(iduser, idCardapio, turno)=>{

    sql= "INSERT INTO reserva (id_cardapio, aluno_id, turno) VALUE ('"+idCardapio+"','"+iduser+"','"+turno+"' )";

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

verificaReserva = async (iduser, idCardapio, turno)=>{
    sql = "SELECT * FROM reserva WHERE aluno_id = '"+iduser+"' AND id_cardapio = '"+idCardapio+"' AND turno = '"+turno+"'";
    const resultado = await mysql.query(sql);
    if(resultado.length > 0){
        return true;
    }else{
        return false;
    }
}

removerReserva = async (iduser, idCardapio, turno)=>{
    sql = "DELETE FROM reserva WHERE aluno_id = '"+iduser+"' AND id_cardapio = '"+idCardapio+"' AND turno = '"+turno+"'";
    const remocao = mysql.query(sql);
    if(remocao){
        const reservado = "UPDATE cardapio SET reservas = reservas -1 WHERE id_cardapio = '"+idCardapio+"' AND reservas > 0"
        const resultado = await mysql.query(reservado);
        if(resultado){
            return {
                deletado: true,
                remocao
            }
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

editar = async(idCardapio, body) =>{
    sql= "UPDATE cardapio SET nome ='"+body.nome+"', descricao='"+body.descricao+"', data='"+body.data+"' WHERE id_cardapio ='"+idCardapio+"'";
    const editarCardapio = await mysql.query(sql);
    console.log(editarCardapio);
    if(editarCardapio.affectedRows > 0){
        return{
            success: true,
            msg: 'Cardápio editado com sucesso'
        }
    }else{
        return{
            success: false,
            msg: 'Erro ao editar cardápio'
        }
    }
}

module.exports={get,busca,reservar,removerReserva,verificaReserva,deletar,cadastrar,editar};