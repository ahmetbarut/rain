<?php

use Core\Curl\Client;

require_once dirname(__DIR__) . '/vendor/autoload.php';

$container = new \Core\Container\Container();

$container->set("auth", new \Core\Auth\User());
$container->set("app", new \Core\App());
$container->set("config", new \Core\Config\App);
$container->set("view", new \Core\View\Render());

$container->set(
    "translation",
    new \ahmetbarut\Translation\Translation(
        config(
            "translation.path",
            config("translation.format")
        )
    )
);
$client = new Client();
$settings = $client->get("/common/general/generals", ["lang" => "tr"])->d;

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
