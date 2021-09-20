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
