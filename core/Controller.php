<?php

namespace Core;

class Controller
{
    /**
     * Geriye bir şablon döndürür
     * @param string $viewName
     * @param array $data
     * @return
     */
    public function view(string $viewName, array $data = [])
    {
        extract($data);
        $appDir =  dirname(__DIR__);
        include $appDir . "/view/" . $viewName . ".php";
    }

    public function error($message, $code, $file, $line, $uri)
    {
        ini_set("display_errors", false);
        return $this->view('errors/404', [
            "code" =>  $code,
            "message" => $message,
            "file" => $file,
            "line" => $line,
            "uri" =>  $uri
        ]);
    }
}
