<?php

namespace Mudita\View;

class ViewCache
{
    /**
     * Stored cache path.
     * @var string $cachePath
     */
    private string $cachePath;

    /**
     * Cache constructor.
     * @param $cachePath
     */
    public function __construct($cachePath)
    {
        $this->cachePath = $cachePath;

        if (!is_dir($cachePath)) {
            throw new \Error("Can't find cache directory.");
        }

    }

    /**
     * If the cache file does not exist, create a new one,
     * if it exists and change it, replace it.
     *
     * @param  string  $view
     * @param  string  $viewPath
     * @param $content
     *
     * @return bool
     */
    public function createViewCache(string $view, string $viewPath, $content): bool
    {
        $cacheFile = $this->cachePath . "/" . md5($view) . ".php";
        $viewPath .= "/{$view}.php";

        if (!file_exists($cacheFile)) {
             file_put_contents($cacheFile, $content) !== false;

             chmod($cacheFile, 0644);
        }else {
            if (filemtime($cacheFile) < filemtime($viewPath)) {
                 file_put_contents($cacheFile, $content) !== false;
                 chmod($cacheFile, 0644);
            }
        }
        return false;
    }

    /**
     * Get a file from cache.
     * @param $viewName
     *
     * @return bool|string
     */
    public function getCacheView($viewName): bool|string
    {
        return ($this->cachePath . "/" . md5($viewName) . ".php");
    }
}