<?php

namespace Mudita\View;

class Render extends Engine
{
    protected static $share = [];

    /**
     * Since views can come in bits and pieces, it is used to store them.
     *
     * @var array $sections[]
     */
    public array $sections = [];

    /**
     * Page included with "extends"
     * @var string $layouts
     */
    public string $layouts = "";

    /**
     * Keeps the currently running partition.
     * @var string $activeSectionName
     */
    public string $activeSectionName;

    /**
     * Render Constructor
     * @param $options
     */
    public function __construct($options)
    {
        parent::__construct($options);
    }

    /**
     * @inheritDoc
     */
    public function load($view, array $data = [])
    {
        parent::load($view, $data);
    }

    /**
     * Include a page.
     * @param $section
     */
    public function extends($section): void
    {
        $this->layouts = $section;
    }

    /**
     * Specify a section.
     *
     * @param  string $section
     */
    public function yield(string $section)
    {
        echo $this->sections[$section];
    }

    /**
     * Specify the area for the section you specified.
     *
     * @param  string $sectionName
     */
    public function startSection(string $sectionName): void
    {
        $this->activeSectionName = $sectionName;
        $this->sections[$sectionName] = "";
        ob_start();
    }

    /**
     * End the section you specified.
     */
    public function endSection()
    {
        $this->sections[$this->activeSectionName] = ob_get_clean();
    }

    public function share(string | array $key, $value = null): bool
    {
        if (is_string($key)) {
            static::$share[$key] = $value;
        }else {
            foreach ($key as $k => $item) {
                static::$share[$k] = $item;
            }
        }
        return true;

    }

    public function __destruct()
    {
        $this->load($this->layouts, static::$share);
    }
}
