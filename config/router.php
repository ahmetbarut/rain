<?php

use ahmetbarut\PhpRouter\Router\Router;

/**
 |------------------------------------------------------------
 |                       router.php
 |------------------------------------------------------------
 | Rotanın yapılandırmasını burdan yapılandırır ve başlatır.
 |
 * @source https://github.com/ahmetbarut/php-router İlgili paketin kaynağı
 */
$router = new Router([
    "namespace" => "App\\Controller\\",
    "debug" => true,
]);


return [
    "path" => dirname(__DIR__) . "/router",
];