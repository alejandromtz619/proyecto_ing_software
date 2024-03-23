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
        $comprobante = $this->model->consultarDetalle($id_producto, $id_usuario);
        if (empty($comprobante)) {
            $sub_total = $precio * $cantidad;
            $data = $this->model->registrarDetalle($id_producto, $id_usuario, $precio, $cantidad, $sub_total);
            if ($data == "ok") {
                $msg = "ok";
            } else {
                $msg = "error al ingresar el producto";
            }
        } else {
            $total_cantidad = $comprobante['cantidad'] + $cantidad;
            $sub_total = $total_cantidad * $precio;
            $data = $this->model->actualizarDetalle($precio, $total_cantidad, $sub_total, $id_producto, $id_usuario);
            if ($data == "modificado") {
                $msg = "modificado";
            } else {
                $msg = "error al modificar el producto";
            }
        }

        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function listar()
    {
        $id_usuario = $_SESSION['id_usuario'];
        $data['detalle'] = $this->model->getDetalle($id_usuario);
        $data['total_pagar'] = $this->model->calcularCompra($id_usuario);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function delete($id)
    {
        $data = $this->model->deleteDetalle($id);
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
        $total = $this->model->calcularCompra($id_usuario);
        $data = $this->model->registraCompra($total['total']);
        if ($data == 'ok') {
            $detalle = $this->model->getDetalle($id_usuario);
            $id_compra = $this->model->id_compra();

            foreach ($detalle as $row) {
                $cantidad = $row['cantidad'];
                $precio = $row['precio'];
                $id_pro = $row['id_producto'];
                $sub_total = $cantidad * $precio;
                $this->model->registrarDetalleCompra($id_compra['id'], $id_pro, $cantidad, $precio, $sub_total);
            }
            $vaciar = $this->model->vaciarDetalle($id_usuario);
            if ($vaciar == 'ok') {
                $msg = array('msg' => 'ok', 'id_compra' => $id_compra['id']);
            }
        } else {
            $msg = 'Error al realizar la compra';
        }
        echo json_encode($msg);
        die();
    }

    public function generarPdf($id_compra)
    {
        $empresa = $this->model->getEmpresa();
        require('Libraries/fpdf/fpdf.php');

        $pdf = new FPDF('P', 'mm', array(80, 200));
        $pdf->AddPage();
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
        $pdf->Output();
    }
}
