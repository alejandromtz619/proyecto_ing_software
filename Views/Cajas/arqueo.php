<?php include "Views/Templates/header.php"; ?>
<ol class="breadcrumb mb-4">
    <li class="breadcrumb-item active">Arqueo de Caja</li>
</ol>
<button class="btn btn-primary mb-2" type="button" onclick="arqueoCaja();"><i class="fas fa-plus"></i></button>
<button class="btn btn-primary mb-2" type="button" onclick="cerrarCaja();">Cerrar Caja</button>

<table class="table table-light" id="tblArqueo">
    <thead class="thead-dark">
        <tr>
            <th>Id</th>
            <th>Monto_inicial</th>
            <th>Monto_final</th>
            <th>Fecha_apertura</th>
            <th>Fecha_cierre</th>
            <th>Total Ventas</th>
            <th>Monto Total</th>
            <th>Estado</th>

        </tr>
    </thead>
    <tbody>
    </tbody>
</table>
<div id="abrir_caja" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="my-modal-title" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <h5 class="modal-title text-white" id="title">Arqueo Caja</h5>
                <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form method="post" id="frmAbrirCaja" onsubmit="abrirArqueo(event);">

                    <div class="form-group">
                        <label for="monto_inicial">Monto Inicial</label>
                        <input type="hidden" id="id" name="id">
                        <input id="monto_inicial" class="form-control" type="text" name="monto_inicial" placeholder="Monto Inicial">
                    </div>
                    <div class="form-group">
                        <label for="fecha_apertura">Fecha Apertura</label>

                        <input id="fecha_apertura" class="form-control" type="date" value="<?php echo date('Y-m-d') ?>" name="fecha_apertura" required>
                    </div>
                    <div class="form-group">
                        <label for="monto_final">Monto Final</label>
                        <input id="monto_final" class="form-control" type="text" disabled>
                    </div>
                    <div class="form-group">
                        <label for="total_ventas">Total Ventas</label>
                        <input id="total_ventas" class="form-control" type="text" disabled>
                    </div>
                    <button class="btn btn-primary" type="submit" id="btnAccion">Abrir</button>
                    <button class="btn btn-danger" type="button" data-dismiss="modal">Cancelar</button>
                </form>
            </div>
        </div>
    </div>
</div>
<?php include "Views/Templates/footer.php"; ?>