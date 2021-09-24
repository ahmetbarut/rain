<?php

namespace Core\View;

class Component
{
    /**
     * Görünümdeki sayfaları tutar.
     *
     * @var array
     */
    public array $component = [];

    /**
     * "extends" yöntemiyle dahil edilen dosyayı tutar.
     *
     * @var string
     */
    public string $layout;

    /**
     * Aktif dosyayı tutar.
     *
     * @var string
     */
    public string $section;

    /**
     * Görünüm tarafına iletilen değişkenleri tutar.
     *
     * @var array
     */
    protected array $vars = [];

    /**
     * Ana bileşeni çağırır. 
     *
     * @param string $layout Dahil edilmesi istenen sayfa adı. Örn: home.php "home" diye yazılır.
     * @param array $data gönderilmesi istenen değişkenler.
     * @return static
     */
    public function extends(string $layout, array $data = null)
    {
        $this->layout = $layout;
        $this->vars = $data;
        return $this;
    }

    /**
     * Bileşeni başlatır ve burdan sonra yazılan tüm kodları toplar.
     *
     * @param string $section
     * @return void
     */
    public function startSection(string $section): void
    {
        $this->section = $section;
        $this->component[$section] = "";
        ob_start();
    }

    /**
     * Bileşeni durdur. Öncesinde yazılan tüm kodları 
     * getirir ve ilgili bileşen adına ekler, ardından işler ve yazdırır.
     * 
     * @return void
     */
    public function stopSection(): void
    {
        $this->component[$this->section] = ob_get_clean();

        (new Render)->render($this->layout, $this->vars);

    }
    
    /**
     * Bileşen adı tanımlamayı sağlar. Bu, başlık veya içerik adı olabilir.
     *
     * @param string $define
     * @return void
     */
    public function define(string $define)
    {
        echo $this->component[$define];
    }

    public function include(string $page)
    {
        require_once config('view.path') . "/{$page}.php";
    }
    
}
