<?php

namespace Mudita\View;

class ViewError
{
    public array $err = [];
    public function __construct($viewName)
    {
        $this->err = array_merge(error_get_last(),["viewName" => $viewName]);
        extract($this->err);

        require_once __DIR__ ."/ErrorTemplate/errors.php";
    }
}