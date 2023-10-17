<?php
namespace ApiMerenda\controller;

use \ApiMerenda\model\UserModel;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

/**
 * UserController - Controller de usuários
 * @author Cândido Farias
 * @package mvc
 * @since 0.1
 */
class UserController{
	private $userModel;
	public function __construct(){
		$this->userModel = new \ApiMerenda\model\UserModel;
	}
	/**
	* Carrega a página "/views/user/index.php"
	* @author Cândido Farias
	*/
  public static function index($request, $response) {
		$body = $request->getBody()->getContents();
		$data = json_decode($body);

		$response->withHeader('Content-Type', 'application/json');
		$resp = [
			'status'=> 200,
			"data"=> "{}"
		];
		$response->getBody()->write(json_encode(
			$resp
		));
		return $response;
	} // index
	
	
  /**
	* Autentica o usuario"
	* @author Cândido Farias
	*/
  public static function autenticar($request, $response) {
		$body = $request->getBody()->getContents();
		$data = json_decode($body);
		$resp = UserModel::autenticar($data->email, $data->senha);
		$response->withHeader('Content-Type', 'application/json');
		$response->getBody()->write(json_encode(
			$resp
		));
		return $response;
	}
} // class UserController