<?php
namespace ApiMerenda\controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class CardapioController{
	
	public static function add($request, $response){
		$response->getBody()->write('add');
		return $response;
	}

	public static function getAll($request, $response){
		$response->getBody()->write('getAll');
		return $response;
	}

	public static function get($request, $response){
		$response->getBody()->write('get');
		return $response;
	}

	public static function reservar($request, $response){
		$response->getBody()->write('reservar');
		return $response;
	}

}
