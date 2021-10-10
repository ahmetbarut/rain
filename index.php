<?php
session_start();
require_once './vendor/autoload.php';
$finder = new \Symfony\Component\Finder\Finder();

$finder->files()->in(__DIR__ . '/src/Rules');

$container = new \Core\Container\Container();

$container->set("auth", new \Core\Auth\User());

$container->set("session", new \Core\Http\Session\SessionManager());

$container->set("app", new \Core\App());

$container->set("config", new \Core\Config\App);

$container->set("view", new \ahmetbarut\View\Render([
    'view' => __DIR__ . '/template',
    'cache' => __DIR__ . '/var/view'
]));

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

try {
    $container->set('validation', new \ahmetbarut\Validation\Validate(config('validation.rules')));
} catch (\ahmetbarut\PhpRouter\Exception\NotRouteFound $e) {
}

spl_autoload_register(function ($className){

    include  __DIR__. '/core/Commands/' . $className . '.php';
});
dd(class_exists('CreateCommand'));

$container->get("translation")->setLocale("tr");

$container->get("app")->loadRouter();
