<?php
error_reporting(E_ALL ^ E_NOTICE ^ E_DEPRECATED ^ E_WARNING);
//header("Access-Control-Allow-Origin: *");
//header('Content-Type: application/json; charset=UTF-8');
$thename='Bincom ICT';
$website_address =(isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$website_url="http://localhost/bincom/bincom_interview/app";
//$website_url="http://192.168.43.159/sowapp.com";
?>
