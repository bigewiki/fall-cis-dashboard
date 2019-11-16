<?php
    declare(strict_types=1);

    //document root must be changed when migrated
    if( $_SERVER['HTTP_HOST'] == 'localhost'){
        $docRoot = '/edward/js-forms/';
    } else {
        //$docRoot = '/edward/js-forms/';
    }

    class Router{
        private function getUri(){
            global $docRoot;
            $uri = $_SERVER['REQUEST_URI'];

            if( $uri == $docRoot){
                return array(0 => "home");
            } else {
                $pattern = '/' . preg_replace('|/|','\/',$docRoot) . '/';
                $array = explode("/",preg_replace($pattern,'',$uri));
                return $array;
            }
        }

        public function route(){            
            switch ($this->getUri()[0]) {
                case "home":
                    include('includes/forms.inc.html');
                    break;
                default:
                    echo "<h2>404</h2>";
            }
        }

    }

    $Router = new Router();

    $Router->route();

?>