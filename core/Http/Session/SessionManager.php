<?php

namespace Core\Http\Session;

/**
 * Oturum yönetimini yapar. Flash oturumları da destekler
 *
 * @method SessionInterface has(string $name)
 * @method SessionInterface get(string $name)
 * @method SessionInterface create(string $name, mixed $value)
 * @method SessionInterface destroy()
 */
class SessionManager
{
    /**
     * @var Client|SessionInterface $session
     */
    public SessionInterface|Client $session;

    public function __construct()
    {
        if (\PHP_SESSION_NONE === session_status()) {
            session_start();
        }
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
        if (!in_array($name, $sessions) && null !== $name) {

            return false;
        }elseif (empty($sessions))
        {
            return false;
        }
        return (null !== $name) ? $sessions[$name] : $sessions;
    }

    // burda

    public function unsetFlashData(string $name = null): void
    {
        if ($name !== null && false !== $this->getFlash($name)) {
            unset($_SESSION["flash_" . $name]);
        }
        else {
            unset($_SESSION);
        }
    }

}