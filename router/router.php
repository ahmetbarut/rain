<?php

$router->get('/', "HomeController@index")->name('home');
$router->get('/iletisim', "ContactController@index")->name('contact');


$router->get('/urunler/:urun', "ProductsController@products")->name('products');
$router->get('/teklif/:urun', "OrdersController@orders")->name('orders');



/*
|----------------------------------------------------------------
|                          API   
|---------------------------------------------------------------- 
*/

$router->post('/getSlider', "ServicesController@slider");
$router->post('/getBlogs', "ServicesController@blog");
$router->post('/getCity', "ServicesController@city");
$router->post('/getJobs', "ServicesController@jobs");


/*
|----------------------------------------------------------------
|                          API POST   
|---------------------------------------------------------------- 
*/

$router->post('/product/traffic', 'Products\\TrafficController@validate')->name('product.traffic.validate');
// $router->post('/product/traffic', 'ProductsController@')->name('product.traffic');