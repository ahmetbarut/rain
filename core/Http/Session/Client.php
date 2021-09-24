<?php

namespace Core\Http\Session;

/**
 * Oturumu kullanıcı tarayıcısına kaydetmeyi yapar.
 * Veritabanı veya diğer kayıt türleri için \SesionInterface arayüzünü gerçekleştirmek gerekli.
 */
class Client implements  SessionInterface
{
    /**
     * @param  string|mixed  $name
     *
     * @return bool
     */
    public function has(string $name): bool
    {
        return isset($_SESSION[$name]);
    }

    /**
     * @param  string  $name
     *
     * @return mixed
     */
    public function get(string $name): mixed
    {
        return $_SESSION[$name];
    }

    /**
     * @param  string  $name
     * @param  mixed  $value
     *
     * @return bool
     */
    public function create(string $name, mixed $value): bool
    {
        $_SESSION[$name] = $value;

        return $this->has($name);
    }

    public function flash(string $name, mixed $value): bool
    {
        $this->create("flash_" . $name, $name);
        return $this->has('flash_' . $name);
    }

    /**
     * @return bool
     */
    public function destroy(): bool
    {
        return session_destroy();
    }
}