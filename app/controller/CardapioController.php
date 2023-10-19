<?php
namespace ApiMerenda\controller;

use \ApiMerenda\model\CardapioModel;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class CardapioController{
	
	public static function add($request, $response){
		$body = $request->getBody()->getContents();
		$cardapio = json_decode($body);
		$resp = CardapioModel::add($cardapio);
		$return=null;
		if(is_array($resp)){
			$return = [
				"status"=>200,
				"msg"=> "Registro realizado com sucesso!",
				"data"=>$resp
			];
		}
		$response->getBody()->write(
			json_encode($return)
		);
		return $response;
	}

	public static function getAll($request, $response,$args){
		
		$response->getBody()->write('getAll');
		return $response;
	}

	public static function get($request, $response){
		//$query=$request->getQueryString();
		
		$response->getBody()->write('get');
		return $response;
	}

	public static function reservar($request, $response){
		$response->getBody()->write('reservar');
		return $response;
	}

}
