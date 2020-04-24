<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    // return $router->app->version();
    return str_random(40);
});
$router->get('/penyewa','PenyewaController@get');
$router->post('/penyewa','PenyewaController@find');
$router->post('/penyewa/save','PenyewaController@save');
$router->delete('/penyewa/drop/{id_penyewa}','PenyewaController@drop');

$router->get('/motor','MotorController@get');
$router->post('/motor','MotorController@find');
$router->post('/motor/save','MotorController@save');
$router->delete('/motor/drop/{id__motor}','MotorController@drop');

$router->get('/pemilik','PemilikController@get');
$router->post('/pemilik','PemilikController@find');
$router->post('/pemilik/save','PemilikController@save');
$router->delete('/pemilik/drop/{id_pemilik}','PemilikController@drop');

$router->get('/user','UserController@get');
$router->post('/user','UserController@find');
$router->post('/user/save','UserController@save');
$router->delete('/user/drop/{id_user}','UserController@drop');
$router->post("/user/auth", "UserController@auth");
