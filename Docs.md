- [Giriş](#giriş)
- [Dizin Yapısı](#dizin-yapısı)
  - [config](#config)
  - [core](#core)
  - [public](#public)
  - [router](#router)
  - [src](#src)
  - [template](#template)
  - [translation](#translation)
  - [tests](#tests)
  - [vendor](#vendor)
- [Kullanım](#kullanım)
  
# Giriş
Çerçeve geliştirme aşamasındadır burda belirtilen özellik ve yapılar ilerde değişebilir.

# Dizin Yapısı
## [config](Docs/config.md)
`config` dizini, çerçevenin yapılandırma dosyalarını tutar. Tüm yapılandırmaları bir yerde bulunmasının amacı karmaşayı ortadan kaldırmaya çalışmaktır.
## [core](Docs/core.md)
`core` dizini, çerçevenin kaynak kodlarını tutar. Çerçeveye eklenmesi istenen tüm kodların bulunacağı dizindir.
## [public](Docs/public.md)
`public` dizini, halka açık tek dizin olması amaçlanmaktadır aksi takdirde güvenlik ile ilgili problemler oluşabilir. `public` içinde, `javascript`, `css` ve `fotoğraflarlar` bulunur. 
## [router](Docs/router.md)
`router` dizini, yönlendirmelerin bulunduğu dizindir. İçinde şuanda sadece `routes.php` dosyası var.
## [src](Docs/src.md)
`src` dizini, uygulamayı yönetmek için yazacağımız kodları içerir. 
## [template](Docs/template.md) 
`template` dizini, şablonlarımızın bulunduğu dizindir. 
## [translation](Docs/translation.md) 
`translation` dizini, çerçevenin dil dosyalarını tutar. 
## [tests](Docs/tests.md) 
`tests` dizini, teslerin bulunduğu dizindir.
## [vendor](Docs/vendor.md)
`vendor` dizini, `composer` ile kurulan bağımlılıkların toplandığı dizindir.

# Kullanım 