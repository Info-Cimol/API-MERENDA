<?php
namespace ApiMerenda\model;
use PDO;
class Model{
	public static function query($sql){
		$bd=null;
		try
		{
			$bd = new PDO( 'mysql:host=localhost;port=3308;dbname=cimol', 'root', 'mysql' );
			//return $bd;
		}
		catch ( PDOException $e )
		{
			echo 'Erro ao conectar com o MySQL: ' . $e->getMessage();
			return false;
		}
		if($bd){
			$result = $bd->query($sql);
			$rows = $result->fetchAll();
			return $rows;
		}
		return false;
	}
	
}