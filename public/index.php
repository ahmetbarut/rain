<?php
require_once dirname(__DIR__) . '/vendor/autoload.php';

$container = new \Core\Container\Container();

$container->set("app", new \Core\App());

$container->set("translation",
    new \ahmetbarut\Translation\Translation(
        config("translation.path",
            config("translation.format"))
    ));

$container->get("translation")->setLocale("tr");

error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);


$container->get("app")->loadRouter();