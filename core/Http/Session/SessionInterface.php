<?php

namespace Core\Http\Session;

interface SessionInterface
{
    /**
     * Oturumun varlığını kontrol eder.
     * 
     * @param mixed $name
     * @return bool
     */
    public function has(string $name): bool;

    /**
     * Oturumun değerini getirir.
     *
     * @param string $name
     * @return mixed
     */
    public function get(string $name): mixed;

    /**
     * Yeni bir oturum verisi oluşturur.
     *
     * @param string $name
     * @param mixed $value
     * @return bool
     */
    public function create(string $name, mixed $value): bool;

    /**
     * Oturumu siler. Eğer oturum ismi belirtilirse ilgili oturumu, belirtilmezse tüm oturumları siler.
     *
     * @param string|null $name
     * @return bool
     */
    public function destroy(): bool;
}
