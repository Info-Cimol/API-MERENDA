<?php
$app->get('/', function (Request $request, Response $response, $args) { 
	$response->withHeader('Content-Type', 'application/json');
	$resp = [
		'version'=> "1.0.0",
		"name"=> "API - Merenda CIMOL",
		"Description" => "API responsável por fornecer os serviços necessários para manter a plicação de gestão de cardapio da merenda da Escola técnica Estadual Monteiro Lobato"
	];
	$response->getBody()->write(json_encode(
		$resp
	));
	return $response;
});
$app->get('/sobre', function (Request $request, Response $response, $args) { 
	$response->withHeader('Content-Type', 'application/json');
	$resp = [
		'version'=> "1.0.0",
		"name"=> "API - Merenda CIMOL",
		"Description" => "API responsável por fornecer os serviços necessários para manter a plicação de gestão de cardapio da merenda da Escola técnica Estadual Monteiro Lobato"
	];
	$response->getBody()->write(json_encode(
		$resp
	));
	return $response;
});