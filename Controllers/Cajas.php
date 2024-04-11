<?php

class Cajas extends Controller
{
    public function __construct()
    {
        session_start();
        if (empty($_SESSION['activo'])) {
            header("location: " . base_url);
        }
        parent::__construct();
    }
    public function index()
    {
        $this->views->getView($this, "index");
    }

    public function arqueo()
    {
        $this->views->getView($this, "arqueo");
    }
    public function listar()
    {
        $data = $this->model->getCajas('caja');
        for ($i = 0; $i < count($data); $i++) {
            if ($data[$i]['estado'] == 1) {
                $data[$i]['estado'] = '<span class="badge badge-success">Activo</span>';
                $data[$i]['acciones'] = '<div>
            <button class="btn btn-primary" type="button" onclick= "btnEditarCaja(' . $data[$i]['id'] . ');"><i class="fas fa-edit"></i></button>
            <button class="btn btn-danger" type="button" onclick="btnEliminarCaja(' . $data[$i]['id'] . ');"><i class="fas fa-trash-alt"></i></button>
            <div/>';
            } else {
                $data[$i]['estado'] = '<span class="badge badge-danger">Inactivo</span>';
                $data[$i]['acciones'] = '<div>
            <button class="btn btn-success" type="button" onclick="btnReingresarCaja(' . $data[$i]['id'] . ');">Reingresar</button>
            <div/>';
            }
        }
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function listarArqueo()
    {
        $data = $this->model->getCajas('cierre_caja');
        for ($i = 0; $i < count($data); $i++) {
            if ($data[$i]['estado'] == 1) {
                $data[$i]['estado'] = '<span class="badge badge-success">Abierta</span>';
            } else {
                $data[$i]['estado'] = '<span class="badge badge-danger">Cerrada</span>';
            }
        }
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function registrar()
    {
        $caja = $_POST['caja'];
        $id = $_POST['id'];
        if (empty($caja)) {
            $msg = 'Todos los campos son obligatorios';
        } else {
            if ($id == "") {
                $data = $this->model->registrarCaja($caja);
                if ($data == "ok") {
                    $msg = array("msg" => "Caja registrada con exito", "icono" => "success");
                } else if ($data = "existe") {
                    $msg = array("msg" => "La caja ya existe", "icono" => "warning");
                } else {
                    $msg = array("msg" => "Error al registrar la caja", "icono" => "error");
                }
            } else {
                $data = $this->model->modificarCaja($caja, $id);
                if ($data == "modificado") {
                    $msg = "modificado";
                } else {
                    $msg = "Error al modificar caja";
                }
            }
        }
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function abrirArqueo()
    {
        $monto_inicial = $_POST['monto_inicial'];
        $fecha_apertura = date('Y-m-d');
        $id_usuario = $_SESSION['id_usuario'];

        if (empty($monto_inicial) || empty($fecha_apertura)) {
            $msg = 'Todos los campos son obligatorios';
        } else {
            $data = $this->model->registrarArqueo($id_usuario, $monto_inicial, $fecha_apertura);
            if ($data == "ok") {
                $msg = array("msg" => "Caja abierta con exito", "icono" => "success");
            } else if ($data = "existe") {
                $msg = array("msg" => "La caja ya esta abierta", "icono" => "warning");
            } else {
                $msg = array("msg" => "Error al abrir la caja", "icono" => "error");
            }
        }
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function editar(int $id)
    {
        $data = $this->model->editarCaja($id);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function eliminar(int $id)
    {
        $data = $this->model->accionCaja(0, $id);
        if ($data == 1) {
            $msg = "ok";
        } else {
            $msg = "Error al eliminar caja";
        }
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function reingresar(int $id)
    {
        $data = $this->model->accionCaja(1, $id);
        if ($data == 1) {
            $msg = "ok";
        } else {
            $msg = "Error al reingresar caja";
        }
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function getVentas()
    {
        $id_usuario = $_SESSION['id_usuario'];
        $data['monto_total'] = $this->model->getVentas($id_usuario);
        $data['total_ventas'] = $this->model->getTotalVentas($id_usuario);

        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }
}
