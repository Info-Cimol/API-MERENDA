<?php
require __DIR__ . '/vendor/autoload.php';
use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use ApiMerenda\controller\SobreController;
use ApiMerenda\controller\UserController;
use ApiMerenda\controller\CardapioController;


$app = AppFactory::create();
$app->addErrorMiddleware(true, true, true);


# ROTAS
$app->get('/', [SobreController::class,'index']);
$app->get('/sobre', [SobreController::class,'index']);
$app->post('/login', [UserController::class,'autenticar']);
$app->get('/cardapio', [CardapioController::class,'getAll']);
$app->get('/cardapio/{id}', [CardapioController::class,'get']);
$app->post('/cardapio', [CardapioController::class,'add']);
$app->get('/cardapio/reserva/{id}', [CardapioController::class,'reservar']);

$app->options(
	'/{routes:+}',
	function ($request, $response){
		return $response;
	}
);

$app->add(
	function($request, $handler){
		$response = $handler->handle($request);
    return $response
            ->withHeader('Access-Control-Allow-Origin', 'http://mysite')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	}
);

$app->run();