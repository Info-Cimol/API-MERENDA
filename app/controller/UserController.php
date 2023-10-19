<?php
namespace ApiMerenda\controller;

use \ApiMerenda\model\UserModel;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use Firebase\JWT\JWT;

use \ApiMerenda\util\jwtUtil;

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
		$returm=[];
		$resp = UserModel::autenticar($data->email, $data->senha);
		$return['auth']=true;
	  $key=$resp[0]['pessoa_id'];
		$expire = (new \DateTime("now", new \DateTimeZone("America/Sao_Paulo")))->modify("+1 hour")->format("Y-m-d H:i:s");
		$return['token']= JWT::encode(["expired_at" => $expire], "{$key}",'HS256');
		$return['user']=$resp[0];
		$response->withHeader('Content-Type', 'application/json');
		$response->getBody()->write(json_encode(
			$return
		));
		return $response;
	}
} // class UserController