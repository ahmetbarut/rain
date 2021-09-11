<?php

namespace ahmetbarut\PhpRouter\Matcher;

use ahmetbarut\PhpRouter\Request\Request;

class Matches
{

    /**
     * @deprecated 17:45
     *
     * @var array
     */
    protected $matches = [];

    /**
     * Eşleşen parametreleri tutar
     *
     * @var array
     */
    protected $parameters = [];

    /**
     * Eşleşen değişkenlerin adlarını tutar. Amaç denetleyicideki değişken adlarıyla eşleştirmek.
     *
     * @var array
     */
    protected $variables = [];

    /**
     * Eşleşme durumunu tutar
     *
     * @var bool
     */
    protected $isMatched;

    public function __construct(protected $options = [])
    {
        array_push($this->options, $options);
        return $this->options;
    }

    /**
     * Eşleştirmeleri çağırır
     * @depends variables()
     * @depends parameters()
     *
     * @return void
     */
    public function match()
    {
        $this->variables();
        $this->parameters();

        return $this;
    }


    /**
     * Değişkenleri verir 
     *
     * @return static
     */
    public function variables()
    {
        $routerUrl = preg_replace("/({[{a-z0-9]+})/", "([\w]+)", $this->options['router_uri']);
        if (preg_match("@" . $routerUrl . "$@m", $this->options['request_uri'], $variables)) {
            for ($i = 0; $i < count($variables); $i++) {
                if ($variables[$i] != Request::uri()) {
                    preg_match("/[\w]+/", $variables[$i], $var);
                    array_push($this->variables, $var[0]);
                }
            }
        }
        return $this;
    }

    public function parameters()
    {
        /** Değişkenlerin değerini verir */
        $explodedUrl = explode("/", trim($this->options['router_uri'], "/"));
        $requestUri = explode("/", trim($this->options['request_uri'], "/"));
        for ($i = 0; $i < count($explodedUrl); $i++) {
            if (preg_match("/(^[{a-z0-9]+[}$])/", $explodedUrl[$i])) {
                array_push($this->parameters, $requestUri[$i]);
            }
        }
    }

    /**
     * Eşleşen parametre varsa döndürür
     *
     * @return array|null
     */
    public function getParameters()
    {
        return $this->parameters;
    }

    /**
     * Eşleşen değişkenleri döndürür.
     *
     * @return array|false
     */
    public function getVariables(): array|false
    {
        return !empty($this->variables) ? $this->variables : false;
    }

    public function setIsMatched(bool $matched)
    {
        $this->isMatched = $matched;
        return $this;
    }
    
    /**
     * Eşleşme durumunu döndürür.
     *
     * @return boolean
     */
    public function isMatched()
    {
        return $this->isMatched;
    }
}
