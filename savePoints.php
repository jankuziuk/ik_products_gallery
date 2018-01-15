<?php
    file_put_contents('points_id_'. $_GET["gallery_id"] .'.txt', file_get_contents('php://input'));
?>