<?php 

namespace Core\Response;

class Response
{
    public $data;
    
    public function __construct( $data = []){
        $this->data = $data;
    }
    
    public function json(array $data, $code = 200)
    {
        http_response_code($code);
        echo json_encode($data);
    }
  
}