<?php

$router = app('router');

return function () use ($router) {

    $router->get('/', function(){
        echo app('view')->load('home');
    });

    $router->get('/home', function(){
        echo 'deneme';
    });
   
$router->run();
};
