<?php

declare(strict_types=1);

namespace Core\Curl;

use stdClass;

class Client {

    private $api_url;
    private $curl;
    public function __construct()
    {
        $this->api_url = config('app.api_url');
        $this->curl = curl_init();
    }
    
    public function get($path, array $query = null): object
    {   

        if(!is_null($query)){
            $query = http_build_query($query);
        }
        curl_setopt_array($this->curl, array(
          CURLOPT_URL => "https://test.inscockpit.net/api/{$path}?{$query}",
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'GET',
          CURLOPT_HTTPHEADER => array(
            'X-Requested-With: XMLHttpRequest'
          ),
        ));
        
        $response = curl_exec($this->curl);
        
        curl_close($this->curl);
        return (object) json_decode($response, true);
        
    }

    public function post($path, $query = []): array
    {
        curl_setopt_array($this->curl, array(
          CURLOPT_URL => "https://test.inscockpit.net/api/{$path}",
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'POST',
          CURLOPT_HTTPHEADER => array(
            'X-Requested-With: XMLHttpRequest'
          ),
          CURLOPT_POSTFIELDS => json_encode($query),
        ));

        $response = curl_exec($this->curl);

        curl_close($this->curl);
        return (array) json_decode($response, true);

    }
}