<?php

declare(strict_types=1);

namespace Core\Curl;

use stdClass;

class Client
{

  /**
   * Stored API url.
   *
   * @var string
   */
  private string $apiUrl;

  /**
   * Stored curl handle.
   *
   * @var \CurlHandle
   */
  private \CurlHandle $curl;

  /**
   * client object constructor.
   */
  public function __construct()
  {
    $this->apiUrl = config('app.api_url');
    $this->curl = curl_init();
  }


  /**
   * Send HTTP GET request.
   *
   * @param string $path
   * @param array|null $query
   * @return object
   */
  public function get(string $path, array $query = null): object
  {

    if (!is_null($query)) {
      $query = http_build_query($query);
    }
    curl_setopt_array($this->curl, array(
      CURLOPT_URL => "{$this->apiUrl}/{$path}?{$query}",
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

  /**
   * Send HTTP POST request.
   *
   * @param string $path
   * @param array|null $query
   * @return object
   */
  public function post(string $path, $query = []): array
  {
    curl_setopt_array($this->curl, array(
      CURLOPT_URL => "{$this->apiUrl}/{$path}",
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
