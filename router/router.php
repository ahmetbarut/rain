<?php 

$router->get('/', "HomeController@index")->name('home');
$router->get('/iletisim', "ContactController@index")->name('home');
$router->post('/getSlider', "ServicesController@slider");
$router->post('/getBlogs', "ServicesController@blog");

$router->get('/urunler/:urun', "ProductsController@products")->name('products');