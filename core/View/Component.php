<?php

namespace Core\View;

class Component extends Render
{
    public $component = [];

    public $layout;

    public $section;

    public function extends($layout)
    {
        $this->layout = $layout;
    }

    public function startSection($section)
    {
        $this->section = $section;
        $this->component[$section] = "";
        ob_start();
    }

    public function stopSection()
    {
        $this->component[$this->section] = ob_get_clean();
        
        $this->section();
        return $this->render($this->layout);

    }

    public function section()
    {
        return $this->component[$this->section];
    }

    public function define($define)
    {
        return $this->component[$define];
    }
}
