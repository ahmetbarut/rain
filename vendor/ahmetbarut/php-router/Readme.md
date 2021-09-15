- [Introduction](#introduction)
- [Setup](#setup)
- [Use Of](#use-of)

# Introduction
It is under development and not stable. If you still want to try it, go to the installation.

# Setup
You need to have the Composer package manager.

```bash
    composer require ahmetbarut/php-router
```
# Use Of
```php
$router = new \ahmetbarut\PhpRouter\Router\Router(
    ['debug' => true]
);
$router->get('/home', function (){
    echo "Home";
})->name('home');

$router->get('/', function(){
    echo "home";
})->name('home');

$router->run();
```