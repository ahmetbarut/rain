<?php
declare(strict_types=1);

namespace ahmetbarut\PhpRouter\Request;

use ahmetbarut\PhpRouter\Request\Input\Put;

class Request 
{
    /**
     * Stored $_GET data.
     *
     * @var array
     */
    public $get;

    /**
     * Stored $_POST data.
     *
     * @var array
     */
    public $post;

    /**
     * Stored $_FILES data.
     *
     * @var array
     */
    public $files;
    
    /**
     * Stored $_COOKIE data.
     *
     * @var array
     */
    public $cookie;
    
    /**
     * Stored $_SESSION data.
     *
     * @var array
     */
    public $session;

    /**
     * Stored PUT HTTP method data.
     *
     * @var \ahmetbarut\PhpRouter\Request\Input\Put
     */
    public $put;
    
    /**
     * Stored request url.
     *
     * @var string
     */
    public $url;
    
    /**
     * Stored request method.
     * @var string
     */
    public $method;
    
    /**
     * Starting Request instance.
     */
    public function __construct()
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        $this->get = $_GET;
        
        $this->post = $_POST;

        $this->files = $_FILES;

        $this->cookie = $_COOKIE;
        
        $this->session = $_SESSION;
        
        $this->put = new Put($this);
        
        $this->method = $this->method();
        
        $this->url = static::uri();

    }
    
    /**
     * Get request url.
     *
     * @return string
     */
    public static function uri()
    {
        $uri = $_SERVER["REDIRECT_URL"] ?? $_SERVER["PATH_INFO"] ?? "/";
        return rtrim($uri, "/") === "" ? "/" : rtrim($uri, "/");
    }

    /**
     * Get request method.
     *
     * @return string
     */
    public static function method()
    {
        return $_SERVER['REQUEST_METHOD'];
    }

    /**
     * Get request host.
     *
     * @return string
     */
    public static function httpReferer()
    {
        return  '//'. trim($_SERVER['HTTP_HOST'], '/');
    }
}