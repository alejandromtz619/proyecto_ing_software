<?php

class ComprasModel extends Query
{
    private $nombre, $id, $estado;
    public function __construct()
    {
        parent::__construct();
    }
    function getProCod(string $cod)
    {
        $sql = "SELECT * FROM productos where codigo='$cod'";
        $data = $this->select($sql);
        return $data;
    }
}
