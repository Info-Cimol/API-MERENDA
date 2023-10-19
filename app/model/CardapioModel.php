<?php
namespace ApiMerenda\model;

require __DIR__."\Model.php";

class CardapioModel extends Model{
	
	/**
	* Consulta para verificar usuario e senha durante a autenticação
	* @
	*
	**/
	public static function add($cardapio){
	$sql="INSERT INTO  cardapio (nome, descricao, data) 
	VALUES 
	('{$cardapio->nome}', '{$cardapio->descricao}', '{$cardapio->data}')";
		//return $sql;
		$result = parent::query( $sql);
		return $result;
		
	}
}