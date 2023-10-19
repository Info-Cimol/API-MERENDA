<?php
function jwt_encode (String $id){
	$expire = (new \DateTime("now", new \DateTimeZone("America/Sao_Paulo")))->modify("+1 hour")->format("Y-m-d H:i:s");
	return JWT::encode(["expired_at" => $expire], $id,'HS256');
}

function jwt_decode(String $token,String $id){
 return JWT::decode($token, new Key($id,'HS256'));
}