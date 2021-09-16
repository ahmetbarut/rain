<?php 

$router->get('/', "HomeController@index");
$router->post('/getSlider', "ServicesController@slider");
$router->post('/getBlogs', "ServicesController@blog");