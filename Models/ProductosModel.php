<?php

class ProductosModel extends Query
{
    private $codigo, $nombre, $precio_compra, $precio_venta, $id_medida, $id_categoria, $id, $estado;
    public function __construct()
    {
        parent::__construct();
    }

    public function getMedidas()
    {
        $sql = "SELECT * FROM medidas WHERE estado = 1";
        $data = $this->selectAll($sql);
        return $data;
    }
    public function getCategorias()
    {
        $sql = "SELECT * FROM categorias WHERE estado = 1";
        $data = $this->selectAll($sql);
        return $data;
    }
    public function getProductos()
    {
        $sql = "SELECT p.*, m.id as id_medida, m.nombre as medida, c.id as id_cat,c.nombre as categoria FROM productos P INNER JOIN medidas m ON p.id_medida = m.id INNER JOIN categorias c ON p.id_categoria = c.id ";
        $data = $this->selectAll($sql);
        return $data;
    }
    public function registrarProducto(string $codigo, string $nombre, string $precio_compra, string $precio_venta, int $id_medida, int $id_categoria)
    {
        $this->codigo = $codigo;
        $this->nombre = $nombre;
        $this->precio_compra = $precio_compra;
        $this->precio_venta = $precio_venta;
        $this->id_medida = $id_medida;
        $this->id_categoria = $id_categoria;
        $verificar = "SELECT * FROM Productos WHERE Producto = '$this->codigo'";
        $existe = $this->select($verificar);
        if (empty($existe)) {
            $sql = "INSERT INTO productos(codigo, descripcion, precio_compra,precio_venta, id_medida, id_categoria) VALUES (?,?,?,?,?,?)";
            $datos = array($this->codigo, $this->nombre, $this->precio_compra, $this->precio_compra, $this->id_medida, $this->id_categoria);
            $data = $this->save($sql, $datos);
            if ($data == 1) {
                $res = "ok";
            } else {
                $res = "error";
            }
        } else {
            $res = "existe";
        }
        return $res;
    }

    public function modificarProducto(string $codigo, string $nombre, string $precio_compra, string $precio_venta, int $id_medida, int $id_categoria, int $id)
    {

        $this->codigo = $codigo;
        $this->nombre = $nombre;
        $this->precio_compra = $precio_compra;
        $this->precio_venta = $precio_venta;
        $this->id_medida = $id_medida;
        $this->id_categoria = $id_categoria;
        $this->id = $id;
        $sql = "UPDATE productos SET codigo = ?, descripcion = ?, precio_compra = ? , precio_venta = ?, id_medida = ?, id_categoria = ? WHERE id= ?";
        $datos = array($this->codigo, $this->nombre, $this->precio_compra, $this->precio_compra, $this->id_medida, $this->id_categoria, $this->id);
        $data = $this->save($sql, $datos);
        if ($data == 1) {
            $res = "modificado";
        } else {
            $res = "error";
        }
        return $res;
    }

    public function editarPro(int $id)
    {
        $sql = "SELECT * FROM productos WHERE id = $id";
        $data = $this->select($sql);
        return $data;
    }

    public function accionPro(int $estado, int $id)
    {
        $this->id = $id;
        $this->estado = $estado;
        $sql = "UPDATE Productos SET estado = ? WHERE id = ?";
        $datos = array($this->estado, $this->id);
        $data = $this->save($sql, $datos);
        return $data;
    }
}
