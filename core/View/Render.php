<?php

namespace Core\View;

class Render extends Component
{

    /**
     * Bütün şablonlara paylaşılan değişkenler.
     *
     * @var array
     */
    public static array $shared;

    /**
     * Denetleyici tarafından gönderilen değişkenleri depolar.
     *
     * @var array
     */
    public array $data;

    /**
     * Yüklenmesi istenen görünümü ve değişkenleri hazırlar.
     *
     * @param  string  $view
     * @param  array|null  $data
     *
     * @return static
     */
    public function render(string $view, array $data = null): static
    {
        if (null !== $data) {
            $this->data = $data;
        }
        
        return $this->load($view, $data);
    }

    /**
     * Görünümleri yüklemek için dizini alması gerekir.
     *
     * @throws \ahmetbarut\PhpRouter\Exception\NotRouteFound
     * @return string
     */
    public function getConfigPath(): string 
    {
        return config('view.path');
    }

    /**
     * İlgili görünümü yükler ve parametreleri değişkene döndürür.
     *
     * @param  string  $view
     * @param  array|null  $data
     *
     * @throws \ahmetbarut\PhpRouter\Exception\NotRouteFound
     * @return static
     */
    public function load(string $view, array $data = null): static
    {
        if (!is_null($data)) {
            extract($data, EXTR_OVERWRITE);
        }
        
        if (!empty(app('view')::$shared)) {
            extract(app('view')::$shared, EXTR_OVERWRITE);
        }

        require_once $this->getConfigPath() . '/' . $view . ".php";
        session()->unsetFlashData();
        return $this;
    }

    public function __toString()
    {
        return $this->render($this->layout, $this->vars);
    }
}
