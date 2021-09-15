<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit00a4bf68a5ccebf40cb6a9970af671cd
{
    public static $files = array (
        '0e6d7bf4a5811bfa5cf40c5ccd6fae6a' => __DIR__ . '/..' . '/symfony/polyfill-mbstring/bootstrap.php',
        '667aeda72477189d0494fecd327c3641' => __DIR__ . '/..' . '/symfony/var-dumper/Resources/functions/dump.php',
        '656970800e23144bfd9bfd1406cb783c' => __DIR__ . '/..' . '/ahmetbarut/php-router/src/Helper/helpers.php',
        '4cb00f382844c197814156a75d06a25f' => __DIR__ . '/..' . '/ahmetbarut/translation/src/Helper/helper.php',
        'c4337e685fbc52b8c24b7d03cac0b82c' => __DIR__ . '/../..' . '/core/Helper/helpers.php',
    );

    public static $prefixLengthsPsr4 = array (
        'a' => 
        array (
            'ahmetbarut\\Translation\\' => 23,
            'ahmetbarut\\PhpRouter\\' => 21,
        ),
        'S' => 
        array (
            'Symfony\\Polyfill\\Mbstring\\' => 26,
            'Symfony\\Component\\VarDumper\\' => 28,
        ),
        'P' => 
        array (
            'Psr\\Container\\' => 14,
        ),
        'C' => 
        array (
            'Core\\' => 5,
        ),
        'A' => 
        array (
            'App\\' => 4,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'ahmetbarut\\Translation\\' => 
        array (
            0 => __DIR__ . '/..' . '/ahmetbarut/translation/src',
        ),
        'ahmetbarut\\PhpRouter\\' => 
        array (
            0 => __DIR__ . '/..' . '/ahmetbarut/php-router/src',
        ),
        'Symfony\\Polyfill\\Mbstring\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/polyfill-mbstring',
        ),
        'Symfony\\Component\\VarDumper\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/var-dumper',
        ),
        'Psr\\Container\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/container/src',
        ),
        'Core\\' => 
        array (
            0 => __DIR__ . '/../..' . '/core',
        ),
        'App\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit00a4bf68a5ccebf40cb6a9970af671cd::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit00a4bf68a5ccebf40cb6a9970af671cd::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit00a4bf68a5ccebf40cb6a9970af671cd::$classMap;

        }, null, ClassLoader::class);
    }
}
