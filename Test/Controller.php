<?php

namespace Test;

class Controller {

    public function getImages(){
        return json_decode(file_get_contents('Test/DB/images.json'), 1);
    }

    public function getPinsTypes(){
        return json_decode(file_get_contents('Test/DB/pins.json'), 1);
    }

    public function getPoints(){
        return json_decode(file_get_contents('Test/DB/points.json'), 1);
    }

    public function getProducts(){
        return json_decode(file_get_contents('Test/DB/products.json'), 1);
    }
}