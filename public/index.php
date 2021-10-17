<?php
session_start();

require_once dirname(__DIR__) . '/vendor/autoload.php';

(new Core\Container\Container())->set("config", new \Core\Config\App);

$app = new \Core\App();

$app->run();