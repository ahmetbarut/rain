<?php

use Core\Curl\Client;
use Core\Http\Request;
require_once './vendor/autoload.php';
session_start();
$sess = new Core\Http\Session\SessionManager(new \Core\Http\Session\Client);

$container = new \Core\Container\Container();
$container->set("auth", new \Core\Auth\User());
$container->set("session", new \Core\Http\Session\SessionManager());
$container->set("app", new \Core\App());
$container->set("config", new \Core\Config\App);
$container->set("view", new \Core\View\Render());
$container->set("router", new ahmetbarut\PhpRouter\Router\Router([
    "namespace" => "App\\Controller\\",
    "debug" => true,
]));

$container->set(
    "translation",
    new \ahmetbarut\Translation\Translation(
        config(
            "translation.path",
            config("translation.format")
        )
    )
);

$container->set('validation', new \ahmetbarut\Validation\Validate(config('validation.rules')));

$client = new Client();
try {
    $settings = $client->get("/common/general/generals", ["lang" => "tr"])->d;
} catch (\Throwable $th) {
    $settings = [];
}

$container->get('view')::$shared = [
    "menus" => $client->post("/common/set/menus", [
        "pos" => 1,
        "lang" => "tr"
    ]),
    "settings" => $settings,
    "partners" => $client->get("/common/partners/list", ["lang" => "tr"]),
    "whyus_data" => $client->get("/common/whyus/get", ["lang" => "tr"]),
    "analytics" => json_decode($settings['third_services']),
    'corporates' => $client->get("/common/cooperate/list", ["lang" => "tr"]),
];
$container->get("translation")->setLocale("tr");

$container->get("app")->loadRouter();
