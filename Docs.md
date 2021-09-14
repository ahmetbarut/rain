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
## config
`config` dizini, çerçevenin yapılandırma dosyalarını tutar. Tüm yapılandırmaları bir yerde bulunmasının amacı karmaşayı ortadan kaldırmaya çalışmaktır.
## core
`core` dizini, çerçevenin kaynak kodlarını tutar. Çerçeveye eklenmesi istenen tüm kodların bulunacağı dizindir.
## public
`public` dizini, halka açık tek dizin olması amaçlanmaktadır aksi takdirde güvenlik ile ilgili problemler oluşabilir. `public` içinde, `javascript`, `css` ve `fotoğraflarlar` bulunur. 
## router
`router` dizini, yönlendirmelerin bulunduğu dizindir. İçinde şuanda sadece `routes.php` dosyası var.
## src
`src` dizini, uygulamayı yönetmek için yazacağımız kodları içerir. 
## template 
`template` dizini, şablonlarımızın bulunduğu dizindir. 
## translation 
`translation` dizini, çerçevenin dil dosyalarını tutar. 
## tests 
`tests` dizini, teslerin bulunduğu dizindir.
## vendor
`vendor` dizini, `composer` ile kurulan bağımlılıkların toplandığı dizindir.

# Kullanım 