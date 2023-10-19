<?php
namespace ApiMerenda\model;

require __DIR__."\Model.php";

class UserModel extends Model{
	
	/**
	* Consulta para verificar usuario e senha durante a autenticação
	* @
	*
	**/
	public static function autenticar($email, $senha){
	$sql="SELECT p.id_pessoa AS pessoa_id, p.nome, p.email,
		(SELECT count(pessoa_id) FROM professor WHERE pessoa_id=p.id_pessoa ) AS professor
		FROM usuario u
		JOIN pessoa p ON p.id_pessoa=u.pessoa_id_pessoa
		WHERE 
		p.email= '$email'
		AND
		u.senha= '$senha' ";
		//return $sql;
		$result = parent::query( $sql);
		return $result;
		
	}

	

}