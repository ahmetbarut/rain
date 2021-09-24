<?php

namespace Core\Http\Session;

class SessionManager
{
    /**
     * @var Client|SessionInterface $session
     */
    public SessionInterface|Client $session;

    public function __construct()
    {
        $this->session = new Client();
    }

    /**
     * Flash oturumu ekler.
     *
     * @param  string  $name
     * @param  mixed  $data
     *
     * @return bool
     */
    public function flash(string $name, mixed $data): bool
    {
        return $this->session->flash($name, $data);
    }

    /**
     * Flash oturumları döndürür.
     *
     * @param  string|null  $name
     *
     * @return false|array|string
     */
    public function getFlash(?string $name = null): false|array|string
    {
        $sessions = [];

        foreach ($_SESSION as $key => $item) {
            if (str_starts_with($key, "flash_")) {
                $sessions[substr($key, 6)] = $item;
            }
        }
        if (!in_array($name, $sessions)) {
            return false;
        }
        return (null !== $name) ? $sessions[$name] : $sessions;
    }
}