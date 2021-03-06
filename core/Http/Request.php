<?php
declare(strict_types=1);

namespace Core\Http;

use ahmetbarut\PhpRouter\Request\Input\InputInterface;
use PHPStan\BetterReflection\Reflection\Exception\ReflectionTypeDoesNotPointToAClassAlikeType;

class Request
{
    /**
     * Stored $_GET data.
     *
     * @var array
     */
    public array $get;

    /**
     * Stored $_POST data.
     *
     * @var array
     */
    public array $post;

    /**
     * Stored $_FILES data.
     *
     * @var array
     */
    public array $files;
    
    /**
     * Stored $_COOKIE data.
     *
     * @var array
     */
    public array $cookie;
    
    /**
     * Stored $_SESSION data.
     *
     * @var array
     */
    public array $session;

    /**
     * Stored PUT HTTP method data.
     *
     * @var \Core\Http\Input\Put
     */
    public \Core\Http\Input\Put $put;
    
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

    private array $input;

    /**
     * Stored input request data.
     *
     * @var ahmetbarut\Validation\Validate
     */
    public \ahmetbarut\Validation\Validate $validation;
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
        
        $this->put = new \Core\Http\Input\Put($this);

        $this->validation = app('validation')->setFields($_REQUEST);
        
        $this->method = $this->method();
        
        $this->url = $this->uri();

        $this->input = array_merge($_GET,$_POST, $_FILES);
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
    public static function method(): string
    {
        return $_SERVER['REQUEST_METHOD'];
    }

    /**
     * Get request host.
     *
     * @return string
     */
    public static function httpReferer(): string
    {
        $scheme = isset($_SERVER['REQUEST_SCHEME']) ? $_SERVER['REQUEST_SCHEME'] :'http';
        return  $scheme . '://' . trim($_SERVER['HTTP_HOST'], '/');
    }

    public function ajax(): bool
    {
        if (isset($_SERVER["HTTP_X_REQUESTED_WITH"])) {
            return  $_SERVER["HTTP_X_REQUESTED_WITH"] === 'XMLHttpRequest';
        }
        return false;
    }

    public function referer(): string
    {
        return trim($_SERVER['HTTP_REFERER'], "/");
    }

    public function input(string $key = null)
    {
        if ($key === null) {
            return $this->input;
        }

        return $this->input[$key];
    }
}