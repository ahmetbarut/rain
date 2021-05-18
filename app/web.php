<?php

use App\Controllers\AdminController;
use App\Controllers\HomeController;
use Core\Route;

$route = new Route;
ini_set('display_errors', true);
$route->set('/{slug}', [AdminController::class, 'index'], 'get');
$route->set('/deneme', [AdminController::class, 'home'], 'get');


$route->run();
