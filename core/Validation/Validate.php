<?php

namespace ahmetbarut\Validation;

use ahmetbarut\Validation\Validation\Rule;
use ReflectionClass;

/**
 * @author Ahmet Barut <ahmetbarut588@gmail.com>
 * @package Security
 * @license MIT
 * @see http://github.com/ahmetbarut/validation 
 */
class Validate
{
    /**
     * İlgili doğrulama için kurallları tutar. 
     *
     * @var array
     */
    private $rules = [];

    /**
     * Doğrulamaya girecek olan alanları tutar.
     *
     * @var array
     */
    private $fields = [];

    /**
     * Doğrulama dahil bütün alanları tutar.
     *
     * @var array
     */
    private $allFields = [];

    /**
     * Doğrulama kuralları.
     *
     * @var array
     */
    public static $ruleClass = [
        "required" => \ahmetbarut\Validation\Validation\Rules\Required::class,
        "number" => \ahmetbarut\Validation\Validation\Rules\Number::class,
        "string" => \ahmetbarut\Validation\Validation\Rules\IsString::class,
        "date" => \ahmetbarut\Validation\Validation\Rules\Date::class,
    ];


    public function __construct(array $rules = [])
    {
        $this->isInstanceOfRules($rules);

        static::$ruleClass = array_merge(static::$ruleClass, $rules);
    }

    /**
     * İlgili alanlara kural belirtmeyi sağlar.
     * @param array $rules kurallar 
     * @return static
     */
    public function setRules(array $rules): static
    {
        foreach ($rules as $key => $value) {
            if (is_string($value)) {
                $rules[$key] = explode('|', $value);
            }
            if (!is_array($rules[$key])) {
                $rules[$key] = [$value];
            }
        }
        $this->rules = $rules;
        return $this;
    }

    /**
     * İstekte gelen veriler.
     *
     * @param array $fields
     * @return static
     */
    public function setFields(array $fields): static
    {
        $this->fields = $fields;
        $this->allFields = $fields;
        return $this;
    }

    /**
     * Sıraya alınmış doğrulamaları yürütür ve çıktıyı verir.
     *
     * @return array|bool
     */
    public function make()
    {
        $fails = [];
        // Burda ilk önce kuralları döngüye koyuyoruz.
        foreach ($this->rules as $key => $rule) {
            // Burdaki 2. döngü ise, kurallar birden fazla olabilmesinden dolayı 2. döngüye ihtiyaç oluyor 
            // Burdaki döngü de ilgili alana ait kuralları dönecek.
            for ($counter = 0; $counter < count($rule); $counter++) {

                // Kural sınıfını çağırır.
                $getRuleClass = (new static::$ruleClass[$rule[$counter]]);

                // Uygulanmış olan arayüzdeki check yöntemine erişip parametreleri çalıştırır ve sonucu alır
                // Kural false dönerse başarısız olarak işaretlenir.
                if ((array_key_exists($key, $this->fields)) && !$getRuleClass->check($key, $this->fields[$key])) {
                    $fails[$key] = $getRuleClass->message();
                } else {
                    $fails[$key] = $getRuleClass->message();
                }
            }
        }
        if (!empty($fails)) {
            return $fails;
        }
        return true;
    }

    /**
     * Oluşturulan kuralın ilgili arayüzü uygulamış mı diye bakar.
     *
     * @param array $instance
     * @return bool
     */
    private function isInstanceOfRules(array $instance)
    {
        foreach ($instance as $class) {
            $r = new ReflectionClass($class);
            if ((new $class instanceof Rule) === false) {
                throw new \InvalidArgumentException(sprintf("%s, not implemented ahmetbarut\Validation\Rules\Rule", $class));
            }
        }
    }

    /**
     * Tüm alanları döndürür.
     *
     * @return array
     */
    public function getAllFields(): array 
    {
        return $this->allFields;
    }
}
