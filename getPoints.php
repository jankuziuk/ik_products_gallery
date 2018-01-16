<?php
    $imagesIds = json_decode(file_get_contents('php://input'), true);
    echo file_get_contents('points_id_'. $_GET["id"] .'.txt') ?? [];
?>