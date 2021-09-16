<?php

namespace Core\View;

class Render extends Component
{

    public static $shared;

    /**
     * Denetleyici tarafından gönderilen değişkenleri depolar.
     *
     * @var array
     */
    public $data;

    /**
     * Yüklenmesi istenen görünümü ve değişkenleri hazırlar.
     *
     * @param string $view
     * @param array $data
     * @return void
     */
    public function render($view, $data = null)
    {
        if (null !== $data) {
            $this->data = $data;
        }
        
        $this->load($view, $data);
    }

    /**
     * Görünümleri yüklemek için dizini alması gerekir.
     *
     * @return Core\Container\Container
     */
    public function getConfigPath()
    {
        return config('view.path');
    }

    /**
     * İlgili görünümü yükler ve parametreleri değişkene döndürür.
     *
     * @param string $view
     * @param array $data
     * @return void
     */
    public function load($view, $data = null)
    {
        if (!is_null($data)) {
            extract($data, EXTR_OVERWRITE);
        }
        
        if (!empty(app('view')::$shared)) {
            extract(app('view')::$shared, EXTR_OVERWRITE);
        }

        require_once $this->getConfigPath() . '/' . $view . ".php";
    }
}
