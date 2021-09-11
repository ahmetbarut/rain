<?php 

namespace App\Controllers;

use ahmetbarut\PhpRouter\Request\Request;

class Controller 
{
    public function index(Request $request, $user)
    {
        dd(func_get_args());
    }
}