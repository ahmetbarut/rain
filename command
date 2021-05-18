#! /bin/php env
<?php 

if ($argv[1] == "server:start"){
    exec("php -S localhost:8000 public/index.php");
}