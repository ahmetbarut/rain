<?php

require_once dirname(__DIR__) . '/vendor/autoload.php';

$container = new \Core\Container\Container();

$container->set("auth", new \Core\Auth\User());
$container->set("app", new \Core\App());
$container->set("config", new \Core\Config\App);
$container->set("view", new \Core\View\Component());

$container->set("translation",
    new \ahmetbarut\Translation\Translation(
        config("translation.path",
            config("translation.format"))
    ));

$container->get("translation")->setLocale("tr");

$container->get("app")->loadRouter();