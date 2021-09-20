<?php
declare(strict_types=1);

namespace Core\Http;

use Core\Http\Input\Put;

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
     * @var \Core\Http\Request\Input\Put
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
    
    public $validation;
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

        $this->validation = app('validation')->setFields($_REQUEST);
        
        $this->method = $this->method();
        
        $this->url = $this->uri();

    }
    
    /**
     * Get request url.
     *
     * @return string
     */
    public static function uri()
    {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH); 
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
        $scheme = isset($_SERVER['REQUEST_SCHEME']) ? $_SERVER['REQUEST_SCHEME'] :'http';
        return  $scheme . '://' . trim($_SERVER['HTTP_HOST'], '/');
    }
}