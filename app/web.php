<?php

use App\Controllers\AdminController;
use App\Controllers\HomeController;
use Core\Route;

$route = new Route;

ini_set('display_errors', true);

$route->prefix('/{lang}');

$route->set('/deneme', [AdminController::class, 'home'], 'get');

$route->set('/{slug}',function ($l){
    echo $l;
}, "GET");

$route->run();
