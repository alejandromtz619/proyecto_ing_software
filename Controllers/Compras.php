<?php

class Compras extends Controller
{
    public function __construct()
    {
        session_start();
        parent::__construct();
    }
    public function index()
    {
        $this->views->getView($this, "index");
    }
    public function ventas()
    {
        $data = $this->model->getClientes();
        $this->views->getView($this, "ventas", $data);
    }

    public function historialventas()
    {
        $this->views->getView($this, "historialventas");
    }

    public function buscarCodigo($cod)
    {
        $data = $this->model->getProCod($cod);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }


    public function ingresar()
    {
        $id = $_POST['id'];
        $datos = $this->model->getProductos($id);
        $id_producto = $datos['id'];
        $id_usuario = $_SESSION['id_usuario'];
        $precio = $datos['precio_compra'];
        $cantidad = $_POST['cantidad'];
        $comprobante = $this->model->consultarDetalle('detalle', $id_producto, $id_usuario);
        if (empty($comprobante)) {
            $subtotal = $precio * $cantidad;
            $data = $this->model->registrarDetalle('detalle', $id_producto, $id_usuario, $precio, $cantidad, $subtotal);
            if ($data == "ok") {
                $msg = array('msg' => 'Producto ingresado a la compra', 'icono' => 'success');
            } else {
                $msg = array('msg' => 'Error al ingresar el producto a la compra', 'icono' => 'error');
            }
        } else {
            $total_cantidad = $comprobante['cantidad'] + $cantidad;
            $subtotal = $total_cantidad * $precio;
            $data = $this->model->actualizarDetalle('detalle', $precio, $total_cantidad, $subtotal, $id_producto, $id_usuario);
            if ($data == "modificado") {
                $msg = array('msg' => 'Producto actualizado', 'icono' => 'success');
            } else {
                $msg = array('msg' => 'Error al actualizar el producto', 'icono' => 'error');
            }
        }

        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function ingresarVenta()
    {
        $id = $_POST['id'];
        $datos = $this->model->getProductos($id);
        $id_producto = $datos['id'];
        $id_usuario = $_SESSION['id_usuario'];
        $precio = $datos['precio_venta'];
        $cantidad = $_POST['cantidad'];
        $comprobante = $this->model->consultarDetalle('detalletemp', $id_producto, $id_usuario);
        if (empty($comprobante)) {
            $subtotal = $precio * $cantidad;
            $data = $this->model->registrarDetalle('detalletemp', $id_producto, $id_usuario, $precio, $cantidad, $subtotal);
            if ($data == "ok") {
                $msg = array('msg' => 'Producto ingresado a la venta', 'icono' => 'success');
            } else {
                $msg = array('msg' => 'Error al ingresar el producto a la venta', 'icono' => 'error');
            }
        } else {
            $total_cantidad = $comprobante['cantidad'] + $cantidad;
            $subtotal = $total_cantidad * $precio;
            $data = $this->model->actualizarDetalle('detalletemp', $precio, $total_cantidad, $subtotal, $id_producto, $id_usuario);
            if ($data == "modificado") {
                $msg = array('msg' => 'Producto actualizado', 'icono' => 'success');
            } else {
                $msg = array('msg' => 'Error al actualizar el producto', 'icono' => 'error');
            }
        }

        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function listar($table)
    {
        $id_usuario = $_SESSION['id_usuario'];
        $data['detalle'] = $this->model->getDetalle($table, $id_usuario);
        $data['total_pagar'] = $this->model->calcularCompra($table, $id_usuario);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function delete($id)
    {
        $data = $this->model->deleteDetalle('detalle', $id);
        if ($data == 'ok') {
            $msg = 'ok';
        } else {
            $msg = 'error';
        }
        echo json_encode($msg);
        die();
    }

    public function deleteVenta($id)
    {
        $data = $this->model->deleteDetalle('detalletemp', $id);
        if ($data == 'ok') {
            $msg = 'ok';
        } else {
            $msg = 'error';
        }
        echo json_encode($msg);
        die();
    }

    public function registrarCompra()
    {
        $id_usuario = $_SESSION['id_usuario'];
        $total = $this->model->calcularCompra('detalle', $id_usuario);
        $data = $this->model->registraCompra($total['total']);
        if ($data == 'ok') {
            $detalle = $this->model->getDetalle('detalle', $id_usuario);
            $id_compra = $this->model->getId('compras');

            foreach ($detalle as $row) {
                $cantidad = $row['cantidad'];
                $precio = $row['precio'];
                $id_pro = $row['id_producto'];
                $subtotal = $cantidad * $precio;
                $this->model->registrarDetalleCompra($id_compra['id'], $id_pro, $cantidad, $precio, $subtotal);
                $stock_actual = $this->model->getProductos($id_pro);
                $stock = $stock_actual['cantidad'] + $cantidad;
                $this->model->actualizarStock($stock, $id_pro);
            }
            $vaciar = $this->model->vaciarDetalle('detalle', $id_usuario);
            if ($vaciar == 'ok') {
                $msg = array('msg' => 'ok', 'id_compra' => $id_compra['id']);
            }
        } else {
            $msg = array('msg' => 'Error al realizar la compra', 'icono' => 'error');
        }
        echo json_encode($msg);
        die();
    }

    public function registrarVenta($id_cliente)
    {
        $id_usuario = $_SESSION['id_usuario'];
        $total = $this->model->calcularCompra('detalletemp', $id_usuario);
        $data = $this->model->registraVenta($id_cliente, $total['total']);
        if ($data == 'ok') {
            $detalle = $this->model->getDetalle('detalletemp', $id_usuario);
            $id_venta = $this->model->getId('ventas');

            foreach ($detalle as $row) {
                $cantidad = $row['cantidad'];
                $desc = $row['descuento'];
                $precio = $row['precio'];
                $id_pro = $row['id_producto'];
                $subtotal = ($cantidad * $precio) - $desc;
                $this->model->registrarDetalleVenta($id_venta['id'], $id_pro, $cantidad, $desc, $precio, $subtotal);
                $stock_actual = $this->model->getProductos($id_pro);
                $stock = $stock_actual['cantidad'] - $cantidad;
                $this->model->actualizarStock($stock, $id_pro);
            }
            $vaciar = $this->model->vaciarDetalle('detalletemp', $id_usuario);
            if ($vaciar == 'ok') {
                $msg = array('msg' => 'ok', 'id_venta' => $id_venta['id']);
            }
        } else {
            $msg = array('msg' => 'Error al realizar la venta', 'icono' => 'error');
        }
        echo json_encode($msg);
        die();
    }

    public function generarPdf($id_compra)
    {
        $empresa = $this->model->getEmpresa();
        $productos = $this->model->getProCompra($id_compra);
        require('Libraries/fpdf/fpdf.php');

        $pdf = new FPDF('P', 'mm', array(80, 200));
        $pdf->AddPage();
        $pdf->SetMargins(5, 0, 0);
        $pdf->SetTitle('Reporte Compra');
        $pdf->SetFont('Arial', 'B', 14);
        $pdf->Cell(65, 10, utf8_decode($empresa['nombre']), 0, 1, 'C');
        $pdf->Image(base_url . 'Assets/img/logo.png', 57, 16, 20, 20);
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->Cell(18, 5, 'Ruc: ', 0, 0, 'L');
        $pdf->SetFont('Arial', '', 9);
        $pdf->Cell(20, 5, $empresa['ruc'], 0, 1, 'L');

        $pdf->SetFont('Arial', 'B', 9);
        $pdf->Cell(18, 5, utf8_decode('Teléfono: '), 0, 0, 'L');
        $pdf->SetFont('Arial', '', 9);
        $pdf->Cell(20, 5, $empresa['telefono'], 0, 1, 'L');

        $pdf->SetFont('Arial', 'B', 9);
        $pdf->Cell(18, 5, utf8_decode('Dirección: '), 0, 0, 'L');
        $pdf->SetFont('Arial', '', 9);
        $pdf->Cell(20, 5, utf8_decode($empresa['direccion']), 0, 1, 'L');

        $pdf->SetFont('Arial', 'B', 9);
        $pdf->Cell(18, 5, 'Folio: ', 0, 0, 'L');
        $pdf->SetFont('Arial', '', 9);
        $pdf->Cell(20, 5, $id_compra, 0, 1, 'L');
        $pdf->Ln();
        //Encabezado de productos
        $pdf->SetFillColor(0, 0, 0);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->Cell(10, 5, 'Cant', 0, 0, 'L', true);
        $pdf->Cell(35, 5, utf8_decode('Descripción'), 0, 0, 'L', true);
        $pdf->Cell(10, 5, 'Precio', 0, 0, 'L', true);
        $pdf->Cell(15, 5, 'Sub Total', 0, 1, 'L', true);
        $pdf->SetTextColor(0, 0, 0);
        $total = 0.00;
        foreach ($productos as $row) {
            $total = $total + $row['sub_total'];
            $pdf->Cell(10, 5, $row['cantidad'], 0, 0, 'L');
            $pdf->Cell(35, 5, utf8_decode($row['descripcion']), 0, 0, 'L');
            $pdf->Cell(10, 5, $row['precio'], 0, 0, 'L');
            $pdf->Cell(15, 5, number_format($row['sub_total'], 2, '.', ','), 0, 1, 'L');
        }
        $pdf->Ln();
        $pdf->Cell(75, 5, 'Total a pagar', 0, 1, 'R');
        $pdf->Cell(75, 5, number_format($total, 2, '.', ','), 0, 1, 'R');
        $pdf->Output();
    }

    public function historial()
    {
        $this->views->getView($this, "historial");
    }

    public function listarhistorial()
    {
        $data = $this->model->getHistorialCompras();
        for ($i = 0; $i < count($data); $i++) {
            if ($data[$i]['estado'] == 1) {
                $data[$i]['estado'] = '<span class="badge badge-success">Completado</span>';
                $data[$i]['acciones'] = '<div>
                <button class="btn btn-warning" onclick="btnAnularC(' . $data[$i]['id'] . ');"><i class="fas fa-ban"></i></button>
                <a class="btn btn-danger" href= "' . base_url . "Compras/generarPdf/" . $data[$i]['id'] . '" target="_blank"><i class="fas fa-file-pdf" ></i></button>
                <div/>';
            } else {
                $data[$i]['estado'] = '<span class="badge badge-danger">Anulado</span>';
                $data[$i]['acciones'] = '<div>
                
                <a class="btn btn-danger" href= "' . base_url . "Compras/generarPdf/" . $data[$i]['id'] . '" target="_blank"><i class="fas fa-file-pdf" ></i></button>
                <div/>';
            }
        }
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function listarhistorialventa()
    {
        $data = $this->model->getHistorialVentas();
        for ($i = 0; $i < count($data); $i++) {
            if ($data[$i]['estado'] == 1) {
                $data[$i]['estado'] = '<span class="badge badge-success">Completado</span>';
                $data[$i]['acciones'] = '<div>
                <button class="btn btn-warning" onclick="btnAnularV(' . $data[$i]['id'] . ');"><i class="fas fa-ban"></i></button>
                <a class="btn btn-danger" href= "' . base_url . "Compras/generarPdf/" . $data[$i]['id'] . '" target="_blank"><i class="fas fa-file-pdf" ></i></button>
                <div/>';
            } else {
                $data[$i]['estado'] = '<span class="badge badge-danger">Anulado</span>';
                $data[$i]['acciones'] = '<div>
                
                <a class="btn btn-danger" href= "' . base_url . "Compras/generarPdf/" . $data[$i]['id'] . '" target="_blank"><i class="fas fa-file-pdf" ></i></button>
                <div/>';
            }
        }
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function generarPdfVenta($id_venta)
    {
        $empresa = $this->model->getEmpresa();
        $descuento = $this->model->getDescuento($id_venta);
        $productos = $this->model->getProVenta($id_venta);
        require('Libraries/fpdf/fpdf.php');

        $pdf = new FPDF('P', 'mm', array(80, 200));
        $pdf->AddPage();
        $pdf->SetMargins(5, 0, 0);
        $pdf->SetTitle('Reporte Venta');
        $pdf->SetFont('Arial', 'B', 14);
        $pdf->Cell(65, 10, utf8_decode($empresa['nombre']), 0, 1, 'C');
        $pdf->Image(base_url . 'Assets/img/logo.png', 57, 16, 20, 20);
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->Cell(18, 5, 'Ruc: ', 0, 0, 'L');
        $pdf->SetFont('Arial', '', 9);
        $pdf->Cell(20, 5, $empresa['ruc'], 0, 1, 'L');

        $pdf->SetFont('Arial', 'B', 9);
        $pdf->Cell(18, 5, utf8_decode('Teléfono: '), 0, 0, 'L');
        $pdf->SetFont('Arial', '', 9);
        $pdf->Cell(20, 5, $empresa['telefono'], 0, 1, 'L');

        $pdf->SetFont('Arial', 'B', 9);
        $pdf->Cell(18, 5, utf8_decode('Dirección: '), 0, 0, 'L');
        $pdf->SetFont('Arial', '', 9);
        $pdf->Cell(20, 5, utf8_decode($empresa['direccion']), 0, 1, 'L');

        $pdf->SetFont('Arial', 'B', 9);
        $pdf->Cell(18, 5, 'Folio: ', 0, 0, 'L');
        $pdf->SetFont('Arial', '', 9);
        $pdf->Cell(20, 5, $id_venta, 0, 1, 'L');
        $pdf->Ln();
        //Encabezado de clientes
        $pdf->SetFillColor(0, 0, 0);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->SetFont('Arial', 'B', 7);
        $pdf->Cell(25, 5, 'Nombre', 0, 0, 'L', true);
        $pdf->Cell(20, 5, utf8_decode('Teléfono'), 0, 0, 'L', true);
        $pdf->Cell(25, 5, utf8_decode('Dirección'), 0, 1, 'L', true);
        $pdf->SetTextColor(0, 0, 0);
        $clientes = $this->model->clientesVenta($id_venta);
        $pdf->SetFont('Arial', '', 7);
        $pdf->Cell(25, 5, utf8_decode($clientes['nombre']), 0, 0, 'L');
        $pdf->Cell(20, 5, $clientes['telefono'], 0, 0, 'L');
        $pdf->Cell(25, 5, utf8_decode($clientes['direccion']), 0, 1, 'L');
        $pdf->Ln();

        //Encabezado de productos
        $pdf->SetFillColor(0, 0, 0);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->Cell(10, 5, 'Cant', 0, 0, 'L', true);
        $pdf->Cell(35, 5, utf8_decode('Descripción'), 0, 0, 'L', true);
        $pdf->Cell(10, 5, 'Precio', 0, 0, 'R', true);
        $pdf->Cell(15, 5, 'Sub Total', 0, 1, 'R', true);
        $pdf->SetTextColor(0, 0, 0);
        $total = 0.00;
        foreach ($productos as $row) {
            $total = $total + $row['sub_total'];
            $pdf->Cell(10, 5, $row['cantidad'], 0, 0, 'L');
            $pdf->Cell(35, 5, utf8_decode($row['descripcion']), 0, 0, 'L');
            $pdf->Cell(10, 5, $row['precio'], 0, 0, 'L');
            $pdf->Cell(15, 5, number_format($row['sub_total'], 2, '.', ','), 0, 1, 'R');
        }
        $pdf->Ln();
        $pdf->Cell(75, 5, 'Descuento Total', 0, 1, 'R');
        $pdf->Cell(75, 5, number_format($descuento['total'], 2, '.', ','), 0, 1, 'R');
        $pdf->Cell(75, 5, 'Total a pagar', 0, 1, 'R');
        $pdf->Cell(75, 5, number_format($total, 2, '.', ','), 0, 1, 'R');
        $pdf->Output();
    }

    public function calcularDescuento($datos)
    {
        $array = explode(",", $datos);
        $id = $array[0];
        $desc = $array[1];
        if (empty($id || empty($desc))) {
            $msg = array('msg' => 'Error', 'icono' => 'error');
        } else {
            $descuento_actual = $this->model->verificarDescuento($id);
            $descuento_total = $descuento_actual['descuento'] + $desc;
            $subtotal = ($descuento_actual['cantidad'] * $descuento_actual['precio']) - $descuento_total;
            $data = $this->model->actualizarDescuento($descuento_total, $subtotal, $id);
            if ($data == 'ok') {
                $msg = array('msg' => 'Descuento aplicado', 'icono' => 'success');
            } else {
                $msg = array('msg' => 'Error al aplicar descuento', 'icono' => 'error');
            }
        }
        echo json_encode($msg);
        die();
    }

    public function anularCompra($idcompra)
    {
        $data = $this->model->getAnularCompra($idcompra);
        $anular = $this->model->getAnularC($idcompra);
        foreach ($data as $row) {
            $stockactual = $this->model->getProductos($row['id_producto']);
            $stock = $stockactual['cantidad'] - $row['cantidad'];
            $this->model->actualizarStock($stock, $row['id_producto']);
        }

        if ($anular == 'ok') {
            $msg = array('msg' => 'Compra Anulada', 'icon' => 'success');
        } else {
            $msg = array('msg' => 'Error al anular', 'icon' => 'error');
        }
        echo json_encode($msg);
        die();
    }

    public function anularVenta($idventa)
    {
        $data = $this->model->getAnularVenta($idventa);
        $anular = $this->model->getAnularV($idventa);
        foreach ($data as $row) {
            $stockactual = $this->model->getProductos($row['id_producto']);
            $stock = $stockactual['cantidad'] + $row['cantidad'];
            $this->model->actualizarStock($stock, $row['id_producto']);
        }

        if ($anular == 'ok') {
            $msg = array('msg' => 'Venta Anulada', 'icon' => 'success');
        } else {
            $msg = array('msg' => 'Error al anular', 'icon' => 'error');
        }
        echo json_encode($msg);
        die();
    }
}
