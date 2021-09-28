<?php

namespace Mudita\View;

use Mudita\View\Traits\Matcher;

class Engine
{
    use Matcher;

    /**
     * Stored options.
     * @var array $options
     */
    private array $options;

    /**
     * View cache object.
     * @var ViewCache $cache
     */
    protected \Mudita\View\ViewCache $cache;

    /**
     * Engine constructor.
     * @param $options
     */
    public function __construct($options)
    {
        $this->options = $options;

        $this->cache = new ViewCache($this->config('cache'));

        if (!is_dir($this->config('view'))) {
            throw new \Error("Can't find view directory.");
        }

    }

    /**
     * This is where it works for mapping, caching and loading views.
     *
     * Variables to include in the view are given as an array, pass through the "extract" function,
     * then the view is loaded, thrown into the buffer, then it does the matching and replaces it,
     * then it does the cache operations then the view is loaded.
     *
     * @param string $view
     * @param  array  $data
     */
    public function load(string $view, array $data = []){

        extract($data, EXTR_IF_EXISTS);

        $viewPath = $this->config('view') . "/{$view}.php";
        ob_start();
        require ($viewPath);
        $content = ob_get_clean();

        $content = $this->matchAllTags($content);

        $this->cache->createViewCache($view, $this->config('view'), $content);

        require ($this->cache->getCacheView($view));

        if (null !== error_get_last()) {
            new ViewError($view);
        }

    }

    /**
     * Get options with key.
     *
     * @param  string  $key
     *
     * @return mixed
     */
    public function config(string $key): mixed
    {
        return $this->options[$key];
    }

}