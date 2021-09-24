<?php 

namespace App\Controller;

use Core\Auth\User;
use Core\Controller\BaseController;

class ContactController extends BaseController
{
    public function index()
    {
        return $this->view('contact');
    }
}