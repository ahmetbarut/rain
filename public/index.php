<?php

use App\Controllers\HomeController;
use Core\Route;
use Dotenv\Dotenv;

require_once  "../vendor/autoload.php";

$dotEnv = Dotenv::createImmutable(rootPath());
$dotEnv->load();

require_once "../kernel/bootstrap.php";
