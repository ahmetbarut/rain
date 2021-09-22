<?php

namespace Core\Config;

use Exception;

class App
{

    /**
     * Yapılandırma dizinini tutar.
     *
     * @var string
     */
    private $config;

    /**
     * Yapılandırmalardan istenen paketin yapılandırmasını döndürür. 
     * Helper fonksiyonu ile burası çağrılıyor.
     *
     * @param string $key
     * @return string
     */
    public function get(string $key)
    {
        $key = explode(".", $key);
        $this->config = include dirname(dirname(__DIR__)) . "/config/{$key[0]}.php";
        if (count($key) > 2) {
            throw new Exception("Henüz iç içe diziler desteklenmiyor.");
        }
        
        return $this->config[$key[1]];
    }
}
