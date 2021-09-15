<?php

namespace Core\View;

class Render
{
    private $view;

    private $data;

    public function render($view, $data = null)
    {
        $this->load($view, $data);
    }

    public function data($key, $value = null)
    {
        if (is_array($key)) {
            $this->data = array_merge($this->data, $key);
        } else {
            $this->data[$key] = $value;
        }

        return $this;
    }

    public function getConfigPath()
    {
        return config('view.path');
    }

    public function getPage($page, $properties = "")
    {
        extract(array_merge([
            "render" => new $this,
        ], $properties));
        include_once $this->getConfigPath() . '/' . $page . ".php";
    }

    public function load($view, $data = null)
    {
        if (!is_null($data)) {
            extract($data, EXTR_OVERWRITE);
        }
        extract([
            "render" => new $this,
        ]);
        $include = include $this->getConfigPath() . '/' . $view . ".php";
        if($include)
        {
            return $include;
        }
    }
}
