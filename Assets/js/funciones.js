let tblUsuarios, tblClientes, tblCajas, tblCategorias, tblMedidas, tblProductos;
document.addEventListener("DOMContentLoaded", function () {
  $('#cliente').select2();
  tblUsuarios = $("#tblUsuarios").DataTable({
    ajax: {
      url: base_url + "Usuarios/listar",
      dataSrc: "",
    },
    columns: [
      {
        data: "id",
      },
      {
        data: "usuario",
      },
      {
        data: "nombre",
      },
      {
        data: "caja",
      },
      {
        data: "estado",
      },
      {
        data: "acciones",
      },
    ],
  });
  //Fin de la tabla usuarios
  tblClientes = $("#tblClientes").DataTable({
    ajax: {
      url: base_url + "Clientes/listar",
      dataSrc: "",
    },
    columns: [
      {
        data: "id",
      },
      {
        data: "ci",
      },
      {
        data: "nombre",
      },
      {
        data: "telefono",
      },
      {
        data: "direccion",
      },
      {
        data: "estado",
      },
      {
        data: "acciones",
      },
    ],
  });
  //Fin de la tabla Clientes
  tblCategorias = $("#tblCategorias").DataTable({
    ajax: {
      url: base_url + "Categorias/listar",
      dataSrc: "",
    },
    columns: [
      {
        data: "id",
      },
      {
        data: "nombre",
      },
      {
        data: "estado",
      },
      {
        data: "acciones",
      },
    ],
  });
  //Fin de la tabla Categorias
  tblMedidas = $("#tblMedidas").DataTable({
    ajax: {
      url: base_url + "Medidas/listar",
      dataSrc: "",
    },
    columns: [
      {
        data: "id",
      },
      {
        data: "nombre",
      },
      {
        data: "nombre_corto",
      },
      {
        data: "estado",
      },
      {
        data: "acciones",
      },
    ],
  });
  // Fin de la tabla Medidas
  tblProductos = $("#tblProductos").DataTable({
    ajax: {
      url: base_url + "Productos/listar",
      dataSrc: "",
    },
    columns: [
      {
        data: "id",
      },
      {
        data: "imagen",
      },
      {
        data: "codigo",
      },
      {
        data: "descripcion",
      },
      {
        data: "precio_venta",
      },
      {
        data: "cantidad",
      },
      {
        data: "estado",
      },
      {
        data: "acciones",
      },
    ],
    language: {
      //url: "//cdn.datatables.net/plug-ins/1.10.11/i18n/Spanish.json",
    },
    dom:
      "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-5'i><'col-sm-7'p>>",
    buttons: [
      {
        //Botón para Excel
        extend: "excelHtml5",
        footer: true,
        title: "Archivo",
        filename: "Export_File",

        //Aquí es donde generas el botón personalizado
        text: '<span class="badge badge-success"><i class="fas fa-file-excel"></i></span>',
      },
      //Botón para PDF
      {
        extend: "pdfHtml5",
        download: "open",
        footer: true,
        title: "Reporte de usuarios",
        filename: "Reporte de usuarios",
        text: '<span class="badge  badge-danger"><i class="fas fa-file-pdf"></i></span>',
        exportOptions: {
          columns: [0, ":visible"],
        },
      },
      //Botón para copiar
      {
        extend: "copyHtml5",
        footer: true,
        title: "Reporte de usuarios",
        filename: "Reporte de usuarios",
        text: '<span class="badge  badge-primary"><i class="fas fa-copy"></i></span>',
        exportOptions: {
          columns: [0, ":visible"],
        },
      },
      //Botón para print
      {
        extend: "print",
        footer: true,
        filename: "Export_File_print",
        text: '<span class="badge badge-light"><i class="fas fa-print"></i></span>',
      },
      //Botón para cvs
      {
        extend: "csvHtml5",
        footer: true,
        filename: "Export_File_csv",
        text: '<span class="badge  badge-success"><i class="fas fa-file-csv"></i></span>',
      },
      {
        extend: "colvis",
        text: '<span class="badge  badge-info"><i class="fas fa-columns"></i></span>',
        postfixButtons: ["colvisRestore"],
      }
    ]
  });
  // Fin de la tabla productos
  tblCajas = $("#tblCajas").DataTable({
    ajax: {
      url: base_url + "Cajas/listar",
      dataSrc: "",
    },
    columns: [
      {
        data: "id",
      },
      {
        data: "caja",
      },
      {
        data: "estado",
      },
      {
        data: "acciones",
      },
    ],
  });
  //Fin de la tabla Cajas
  $("#t_historial_c").DataTable({
    ajax: {
      url: base_url + "Compras/listarhistorial",
      dataSrc: "",
    },
    columns: [
      {
        data: "id",
      },
      {
        data: "total",
      },
      {
        data: "fecha",
      },
      {
        data: "acciones",
      },
    ],
  });
  //Fin de historial compras
  $("#t_historial_v").DataTable({
    ajax: {
      url: base_url + "Compras/listarhistorialventa",
      dataSrc: "",
    },
    columns: [
      {
        data: "id",
      },
      {
        data: "nombre",
      },
      {
        data: "total",
      },
      {
        data: "fecha",
      },
      {
        data: "acciones",
      }
    ]
  })
});

function frmCambiarPass(e){
  e.preventDefault();
  const actual = document.getElementById('claveactual').value;
  const nueva = document.getElementById('clavenueva').value;
  const confirmar = document.getElementById('confirmarclave').value;
  if (actual == '' || nueva == '' || confirmar == ''){
    alertas('Todos los campos son obligatorios', 'warning');
    return false;
  } else{
    if (nueva != confirmar){
      alertas('Las contraseñas no coinciden', 'warning');
      return false;
    }else{
      const url = base_url + "Usuarios/cambiarPass";
      const frm = document.getElementById("frmCambiarPass");
      const http = new XMLHttpRequest();
      http.open("POST", url, true);
      http.send(new FormData(frm));
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(this.responseText);
          alertas(res.msg, res.icono);
          $("#cambiarPass").modal("hide");
          frm.reset();
        }
      }
    }

  }
}
function frmUsuario() {
  document.getElementById("title").innerHTML = "Nuevo Usuario";
  document.getElementById("btnAccion").innerHTML = "Registrar";
  document.getElementById("claves").classList.remove("d-none");
  document.getElementById("frmUsuario").reset();
  $("#nuevo_usuario").modal("show");
  document.getElementById("id").value = "";
}
function registrarUser(e) {
  e.preventDefault();
  const usuario = document.getElementById("usuario");
  const nombre = document.getElementById("nombre");
  const caja = document.getElementById("caja");
  if (usuario.value == "" || nombre.value == "" || caja.value == "") {
    alertas("Todos los campos son obligatorios", "warning");
  } else {
    const url = base_url + "Usuarios/registrar";
    const frm = document.getElementById("frmUsuario");
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.send(new FormData(frm));
    http.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const res = JSON.parse(this.responseText);
        $("#nuevo_usuario").modal("hide");
        alertas(res.msg, res.icono);
        tblUsuarios.ajax.reload();
      }
    }
  }
}
function btnEditarUser(id) {
  document.getElementById("title").innerHTML = "Actualizar Usuario";
  document.getElementById("btnAccion").innerHTML = "Modificar";
  const url = base_url + "Usuarios/editar/" + id;
  const http = new XMLHttpRequest();
  http.open("GET", url, true);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.responseText);
      document.getElementById("id").value = res.id;
      document.getElementById("usuario").value = res.usuario;
      document.getElementById("nombre").value = res.nombre;
      document.getElementById("caja").value = res.id_caja;
      document.getElementById("claves").classList.add("d-none");
      $("#nuevo_usuario").modal("show");
    }
  };
}
function btnEliminarUser(id) {
  Swal.fire({
    title: "Estas seguro de eliminar?",
    text: "El usuario no se eliminara de forma permantente, solo cambiara el estado a inactivo!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si!",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      const url = base_url + "Usuarios/eliminar/" + id;
      const http = new XMLHttpRequest();
      http.open("GET", url, true);
      http.send();
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(this.responseText);
          alertas(res.msg, res.icono);
          tblUsuarios.ajax.reload();
        }
      }
    }
  });
}
function btnReingresarUser(id) {
  Swal.fire({
    title: "Estas seguro de reingresar?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si!",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      const url = base_url + "Usuarios/reingresar/" + id;
      const http = new XMLHttpRequest();
      http.open("GET", url, true);
      http.send();
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(this.responseText);
          tblUsuarios.ajax.reload();
          alertas(res.msg, res.icono);
        }
      };
    }
  });
}

//Fin Usuarios
function frmCliente() {
  document.getElementById("title").innerHTML = "Nuevo Cliente";
  document.getElementById("btnAccion").innerHTML = "Registrar";
  document.getElementById("frmCliente").reset();
  $("#nuevo_cliente").modal("show");
  document.getElementById("id").value = "";
}
function registrarCli(e) {
  e.preventDefault();
  const ci = document.getElementById("ci");
  const nombre = document.getElementById("nombre");
  const telefono = document.getElementById("telefono");
  const direccion = document.getElementById("direccion");
  if (
    ci.value == "" ||
    nombre.value == "" ||
    telefono.value == "" ||
    direccion.value == ""
  ) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Todos los campos son obligatorios",
      showConfirmButton: false,
      timer: 3000,
    });
  } else {
    const url = base_url + "Clientes/registrar";
    const frm = document.getElementById("frmCliente");
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.send(new FormData(frm));
    http.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const res = JSON.parse(this.responseText);
        if (res == "si") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Cliente registrado con éxito",
            showConfirmButton: false,
            timer: 3000,
          });
          frm.reset();
          $("#nuevo_cliente").modal("hide");
          tblClientes.ajax.reload();
        } else if (res == "modificado") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Cliente modificado correctamente",
            showConfirmButton: false,
            timer: 3000,
          });
          $("#nuevo_cliente").modal("hide");
          tblClientes.ajax.reload();
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: res,
            showConfirmButton: false,
            timer: 3000,
          });
        }
      }
    };
  }
}

function btnEditarCli(id) {
  document.getElementById("title").innerHTML = "Actualizar Ciente";
  document.getElementById("btnAccion").innerHTML = "Modificar";
  const url = base_url + "Clientes/editar/" + id;
  const http = new XMLHttpRequest();
  http.open("GET", url, true);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.responseText);
      document.getElementById("id").value = res.id;
      document.getElementById("ci").value = res.ci;
      document.getElementById("nombre").value = res.nombre;
      document.getElementById("telefono").value = res.telefono;
      document.getElementById("direccion").value = res.direccion;
      $("#nuevo_cliente").modal("show");
    }
  };
}
function btnEliminarCli(id) {
  Swal.fire({
    title: "Estas seguro de eliminar?",
    text: "El cliente no se eliminara de forma permantente, solo cambiara el estado a inactivo!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si!",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      const url = base_url + "Clientes/eliminar/" + id;
      const http = new XMLHttpRequest();
      http.open("GET", url, true);
      http.send();
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(this.responseText);
          if (res == "ok") {
            Swal.fire("Mensaje!", "Cliente eliminado con exito.", "success");
            tblClientes.ajax.reload();
          } else {
            Swal.fire("Mensaje!", res, "error");
          }
        }
      };
    }
  });
}

function btnReingresarCli(id) {
  Swal.fire({
    title: "Estas seguro de reingresar?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si!",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      const url = base_url + "Clientes/reingresar/" + id;
      const http = new XMLHttpRequest();
      http.open("GET", url, true);
      http.send();
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(this.responseText);
          if (res == "ok") {
            Swal.fire("Mensaje!", "Cliente reingresado con exito.", "success");
            tblClientes.ajax.reload();
          } else {
            Swal.fire("Mensaje!", res, "error");
          }
        }
      };
    }
  });
}

//Fin Clientes
function frmCategoria() {
  document.getElementById("title").innerHTML = "Nueva Categoria";
  document.getElementById("btnAccion").innerHTML = "Registrar";
  document.getElementById("frmCategoria").reset();
  $("#nuevo_categoria").modal("show");
  document.getElementById("id").value = "";
}
function registrarCat(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre");
  if (nombre.value == "") {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Todos los campos son obligatorios",
      showConfirmButton: false,
      timer: 3000,
    });
  } else {
    const url = base_url + "Categorias/registrar";
    const frm = document.getElementById("frmCategoria");
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.send(new FormData(frm));
    http.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const res = JSON.parse(this.responseText);
        if (res == "si") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Categoria registrada con éxito",
            showConfirmButton: false,
            timer: 3000,
          });
          frm.reset();
          $("#nuevo_categoria").modal("hide");
          tblCategorias.ajax.reload();
        } else if (res == "modificado") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Categoria modificada correctamente",
            showConfirmButton: false,
            timer: 3000,
          });
          $("#nuevo_categoria").modal("hide");
          tblCategorias.ajax.reload();
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: res,
            showConfirmButton: false,
            timer: 3000,
          });
        }
      }
    };
  }
}

function btnEditarCat(id) {
  document.getElementById("title").innerHTML = "Actualizar Categoria";
  document.getElementById("btnAccion").innerHTML = "Modificar";
  const url = base_url + "Categorias/editar/" + id;
  const http = new XMLHttpRequest();
  http.open("GET", url, true);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.responseText);
      document.getElementById("id").value = res.id;
      document.getElementById("nombre").value = res.nombre;
      $("#nuevo_categoria").modal("show");
    }
  };
}
function btnEliminarCat(id) {
  Swal.fire({
    title: "Estas seguro de eliminar?",
    text: "La categoria no se eliminara de forma permantente, solo cambiara el estado a inactivo!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si!",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      const url = base_url + "Categorias/eliminar/" + id;
      const http = new XMLHttpRequest();
      http.open("GET", url, true);
      http.send();
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(this.responseText);
          if (res == "ok") {
            Swal.fire("Mensaje!", "Categoria eliminada con exito.", "success");
            tblCategorias.ajax.reload();
          } else {
            Swal.fire("Mensaje!", res, "error");
          }
        }
      };
    }
  });
}

function btnReingresarCat(id) {
  Swal.fire({
    title: "Estas seguro de reingresar?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si!",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      const url = base_url + "Categorias/reingresar/" + id;
      const http = new XMLHttpRequest();
      http.open("GET", url, true);
      http.send();
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(this.responseText);
          if (res == "ok") {
            Swal.fire(
              "Mensaje!",
              "Categoria reingresada con exito.",
              "success"
            );
            tblCategorias.ajax.reload();
          } else {
            Swal.fire("Mensaje!", res, "error");
          }
        }
      };
    }
  });
}

//Fin Categorias
function frmMedida() {
  document.getElementById("title").innerHTML = "Nueva Medida";
  document.getElementById("btnAccion").innerHTML = "Registrar";
  document.getElementById("frmMedida").reset();
  $("#nuevo_medida").modal("show");
  document.getElementById("id").value = "";
}
function registrarMed(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre");
  const nombre_corto = document.getElementById("nombre_corto");
  if (nombre.value == "" || nombre_corto.value == "") {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Todos los campos son obligatorios",
      showConfirmButton: false,
      timer: 3000,
    });
  } else {
    const url = base_url + "Medidas/registrar";
    const frm = document.getElementById("frmMedida");
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.send(new FormData(frm));
    http.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const res = JSON.parse(this.responseText);
        if (res == "si") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Medida registrada con éxito",
            showConfirmButton: false,
            timer: 3000,
          });
          frm.reset();
          $("#nuevo_medida").modal("hide");
          tblMedidas.ajax.reload();
        } else if (res == "modificado") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Medida modificada correctamente",
            showConfirmButton: false,
            timer: 3000,
          });
          $("#nuevo_medida").modal("hide");
          tblMedidas.ajax.reload();
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: res,
            showConfirmButton: false,
            timer: 3000,
          });
        }
      }
    };
  }
}

function btnEditarMed(id) {
  document.getElementById("title").innerHTML = "Actualizar Medida";
  document.getElementById("btnAccion").innerHTML = "Modificar";
  const url = base_url + "Medidas/editar/" + id;
  const http = new XMLHttpRequest();
  http.open("GET", url, true);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.responseText);
      document.getElementById("id").value = res.id;
      document.getElementById("nombre").value = res.nombre;
      document.getElementById("nombre_corto").value = res.nombre_corto;
      $("#nuevo_medida").modal("show");
    }
  };
}
function btnEliminarMed(id) {
  Swal.fire({
    title: "Estas seguro de eliminar?",
    text: "La medida no se eliminara de forma permantente, solo cambiara el estado a inactivo!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si!",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      const url = base_url + "Medidas/eliminar/" + id;
      const http = new XMLHttpRequest();
      http.open("GET", url, true);
      http.send();
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(this.responseText);
          if (res == "ok") {
            Swal.fire("Mensaje!", "Medida eliminada con exito.", "success");
            tblMedidas.ajax.reload();
          } else {
            Swal.fire("Mensaje!", res, "error");
          }
        }
      };
    }
  });
}

function btnReingresarMed(id) {
  Swal.fire({
    title: "Estas seguro de reingresar?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si!",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      const url = base_url + "Medidas/reingresar/" + id;
      const http = new XMLHttpRequest();
      http.open("GET", url, true);
      http.send();
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(this.responseText);
          if (res == "ok") {
            Swal.fire("Mensaje!", "Medida reingresada con exito.", "success");
            tblMedidas.ajax.reload();
          } else {
            Swal.fire("Mensaje!", res, "error");
          }
        }
      };
    }
  });
}

//Fin Medidas

function frmCaja() {
  document.getElementById("title").innerHTML = "Nueva Caja";
  document.getElementById("btnAccion").innerHTML = "Registrar";
  document.getElementById("frmCaja").reset();
  $("#nuevo_caja").modal("show");
  document.getElementById("id").value = "";
}
function registrarCaja(e) {
  e.preventDefault();
  const caja = document.getElementById("caja");
  if (caja.value == "") {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Todos los campos son obligatorios",
      showConfirmButton: false,
      timer: 3000,
    });
  } else {
    const url = base_url + "Cajas/registrar";
    const frm = document.getElementById("frmCaja");
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.send(new FormData(frm));
    http.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const res = JSON.parse(this.responseText);
        if (res == "si") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Caja registrada con éxito",
            showConfirmButton: false,
            timer: 3000,
          });
          frm.reset();
          $("#nuevo_caja").modal("hide");
          tblCajas.ajax.reload();
        } else if (res == "modificado") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Caja modificada correctamente",
            showConfirmButton: false,
            timer: 3000,
          });
          $("#nuevo_caja").modal("hide");
          tblCajas.ajax.reload();
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: res,
            showConfirmButton: false,
            timer: 3000,
          });
        }
      }
    };
  }
}

function btnEditarCaja(id) {
  document.getElementById("title").innerHTML = "Actualizar Caja";
  document.getElementById("btnAccion").innerHTML = "Modificar";
  const url = base_url + "Cajas/editar/" + id;
  const http = new XMLHttpRequest();
  http.open("GET", url, true);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.responseText);
      document.getElementById("id").value = res.id;
      document.getElementById("caja").value = res.caja;
      $("#nuevo_caja").modal("show");
    }
  };
}
function btnEliminarCaja(id) {
  Swal.fire({
    title: "Estas seguro de eliminar?",
    text: "La caja no se eliminara de forma permantente, solo cambiara el estado a inactivo!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si!",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      const url = base_url + "Cajas/eliminar/" + id;
      const http = new XMLHttpRequest();
      http.open("GET", url, true);
      http.send();
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(this.responseText);
          if (res == "ok") {
            Swal.fire("Mensaje!", "Caja eliminada con exito.", "success");
            tblCajas.ajax.reload();
          } else {
            Swal.fire("Mensaje!", res, "error");
          }
        }
      };
    }
  });
}

function btnReingresarCaja(id) {
  Swal.fire({
    title: "Estas seguro de reingresar?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si!",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      const url = base_url + "Cajas/reingresar/" + id;
      const http = new XMLHttpRequest();
      http.open("GET", url, true);
      http.send();
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(this.responseText);
          if (res == "ok") {
            Swal.fire("Mensaje!", "Caja reingresada con exito.", "success");
            tblCajas.ajax.reload();
          } else {
            Swal.fire("Mensaje!", res, "error");
          }
        }
      };
    }
  });
}

//Fin Cajas

function frmProducto() {
  document.getElementById("title").innerHTML = "Nuevo Producto";
  document.getElementById("btnAccion").innerHTML = "Registrar";
  document.getElementById("frmProducto").reset();
  $("#nuevo_producto").modal("show");
  document.getElementById("id").value = "";
  deleteImg();
}
function registrarPro(e) {
  e.preventDefault();
  const codigo = document.getElementById("codigo");
  const descripcion = document.getElementById("descripcion");
  const precio_compra = document.getElementById("precio_compra");
  const precio_venta = document.getElementById("precio_venta");
  const id_medida = document.getElementById("medida");
  const id_cat = document.getElementById("categoria");

  if (
    codigo.value == "" ||
    descripcion.value == "" ||
    precio_compra.value == "" ||
    precio_venta.value == "" ||
    id_medida.value == "" ||
    id_cat.value == ""
  ) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Todos los campos son obligatorios",
      showConfirmButton: false,
      timer: 3000,
    });
  } else {
    const url = base_url + "Productos/registrar";
    const frm = document.getElementById("frmProducto");
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.send(new FormData(frm));
    http.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const res = JSON.parse(this.responseText);
        if (res == "si") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Producto registrado con éxito",
            showConfirmButton: false,
            timer: 3000,
          });
          frm.reset();
          $("#nuevo_producto").modal("hide");
          tblProductos.ajax.reload();
        } else if (res == "modificado") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Producto modificado correctamente",
            showConfirmButton: false,
            timer: 3000,
          });
          $("#nuevo_producto").modal("hide");
          tblProductos.ajax.reload();
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: res,
            showConfirmButton: false,
            timer: 3000,
          });
        }
      }
    };
  }
}

function btnEditarPro(id) {
  document.getElementById("title").innerHTML = "Actualizar Producto";
  document.getElementById("btnAccion").innerHTML = "Modificar";
  const url = base_url + "Productos/editar/" + id;
  const http = new XMLHttpRequest();
  http.open("GET", url, true);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.responseText);
      document.getElementById("id").value = res.id;
      document.getElementById("codigo").value = res.codigo;
      document.getElementById("descripcion").value = res.descripcion;
      document.getElementById("precio_compra").value = res.precio_compra;
      document.getElementById("precio_venta").value = res.precio_venta;
      document.getElementById("medida").value = res.id_medida;
      document.getElementById("categoria").value = res.id_categoria;
      document.getElementById("img-preview").src =
        base_url + "Assets/img/" + res.foto;
      document.getElementById(
        "icon-cerrar"
      ).innerHTML = `<button class="btn btn-danger" onclick="deleteImg();"><i class="fas fa-times"></i></button>`;
      document.getElementById("icon-image").classList.add("d-none");
      document.getElementById("foto_actual").value = res.foto;

      $("#nuevo_producto").modal("show");
    }
  };
}
function btnEliminarPro(id) {
  Swal.fire({
    title: "Estas seguro de eliminar?",
    text: "El producto no se eliminara de forma permantente, solo cambiara el estado a inactivo!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si!",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      const url = base_url + "Productos/eliminar/" + id;
      const http = new XMLHttpRequest();
      http.open("GET", url, true);
      http.send();
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(this.responseText);
          if (res == "ok") {
            Swal.fire("Mensaje!", "Productos eliminado con exito.", "success");
            tblProductos.ajax.reload();
          } else {
            Swal.fire("Mensaje!", res, "error");
          }
        }
      };
    }
  });
}

function btnReingresarPro(id) {
  Swal.fire({
    title: "Estas seguro de reingresar?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si!",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      const url = base_url + "Productos/reingresar/" + id;
      const http = new XMLHttpRequest();
      http.open("GET", url, true);
      http.send();
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(this.responseText);
          if (res == "ok") {
            Swal.fire("Mensaje!", "Producto reingresado con exito.", "success");
            tblProductos.ajax.reload();
          } else {
            Swal.fire("Mensaje!", res, "error");
          }
        }
      };
    }
  });
}

function preview(e) {
  const url = e.target.files[0];
  const urlTmp = URL.createObjectURL(url);
  document.getElementById("img-preview").src = urlTmp;
  document.getElementById("icon-image").classList.add("d-none");
  document.getElementById(
    "icon-cerrar"
  ).innerHTML = `<button class="btn btn-danger" onclick="deleteImg();"><i class="fas fa-times"></i></button>
  ${url["name"]}`;
}

function deleteImg() {
  document.getElementById("icon-cerrar").innerHTML = "";
  document.getElementById("icon-image").classList.remove("d-none");
  document.getElementById("img-preview").src = "";
  document.getElementById("imagen").value = "";
  document.getElementById("foto_actual").value = "";
}

//Fin productos

function buscarCodigo(e) {
  e.preventDefault();
  const cod = document.getElementById("codigo").value;
  if (cod != '') {
    if (e.which == 13) {
      const url = base_url + "Compras/buscarCodigo/" + cod;
      const http = new XMLHttpRequest();
      http.open("GET", url, true);
      http.send();
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(this.responseText);
          if (res) {
            document.getElementById("nombre").value = res.descripcion;
            document.getElementById("precio").value = res.precio_compra;
            document.getElementById("id").value = res.id;
            document.getElementById("cantidad").removeAttribute("disabled");
            document.getElementById("cantidad").focus();
          } else {
            alertas("El producto no existe", "warning");
            document.getElementById("codigo").value = "";
            document.getElementById("codigo").focus();
          }
        }
      };
    }
  } else {
    alertas("Ingrese el codigo", "warning");
  }
}
function buscarCodigoVenta(e) {
  e.preventDefault();
  const cod = document.getElementById("codigo").value;
  if (cod != "") {
    if (e.which == 13) {
      const url = base_url + "Compras/buscarCodigo/" + cod;
      const http = new XMLHttpRequest();
      http.open("GET", url, true);
      http.send();
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(this.responseText);
          if (res) {
            document.getElementById("nombre").value = res.descripcion;
            document.getElementById("precio").value = res.precio_venta;
            document.getElementById("id").value = res.id;
            document.getElementById("cantidad").removeAttribute("disabled");
            document.getElementById("cantidad").focus();
          } else {
            alertas("El producto no existe", "warning");
            document.getElementById("codigo").value = "";
            document.getElementById("codigo").focus();
          }
        }
      };
    }
  } else {
    alertas("Ingrese el codigo", "warning");
  }
}
function calcularPrecio(e) {
  e.preventDefault();
  const cant = document.getElementById("cantidad").value;
  const precio = document.getElementById("precio").value;
  document.getElementById("subtotal").value = precio * cant;
  if (e.which == 13) {
    if (cant > 0) {
      const url = base_url + "Compras/ingresar";
      const frm = document.getElementById("frmCompra");
      const http = new XMLHttpRequest();
      http.open("POST", url, true);
      http.send(new FormData(frm));
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(this.responseText);
          alertas(res.msg, res.icono);
          frm.reset();
          cargarDetalle();
          document.getElementById("cantidad").setAttribute("disabled", "disabled");
          document.getElementById("codigo").focus();
        }
      }
    }
  }
}
function calcularPrecioVenta(e) {
  e.preventDefault();
  const cant = document.getElementById("cantidad").value;
  const precio = document.getElementById("precio").value;
  document.getElementById("subtotal").value = precio * cant;
  if (e.which == 13) {
    if (cant > 0) {
      const url = base_url + "Compras/ingresarVenta";
      const frm = document.getElementById("frmVenta");
      const http = new XMLHttpRequest();
      http.open("POST", url, true);
      http.send(new FormData(frm));
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(this.responseText);
          alertas(res.msg, res.icono);
          frm.reset();
          cargarDetalleVenta();
          document
            .getElementById("cantidad")
            .setAttribute("disabled", "disabled");
          document.getElementById("codigo").focus();
        }
      };
    }
  }
}

if (document.getElementById("tblDetalle")) {
  cargarDetalle();
}

if (document.getElementById("tblDetalleVenta")) {
  cargarDetalleVenta();
}

function cargarDetalle() {
  const url = base_url + "Compras/listar/detalle";
  const http = new XMLHttpRequest();
  http.open("GET", url, true);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.responseText);
      let html = "";
      res.detalle.forEach((row) => {
        html += `<tr>
        <td>${row["id"]}</td>
        <td>${row["descripcion"]}</td>
        <td>${row["cantidad"]}</td>
        <td>${row["precio"]}</td>
        <td>${row["sub_total"]}</td>
        <td>
        <button class="btn btn-danger" type="button" onclick="deleteDetalle(${row["id"]}, 1)">
        <i class="fas fa-trash-alt"></i></button>
        </td>
        </tr>`;
      });
      document.getElementById("tblDetalle").innerHTML = html;
      document.getElementById("total").value = res.total_pagar.total;
    }
  };
}

function cargarDetalleVenta() {
  const url = base_url + "Compras/listar/detalletemp";
  const http = new XMLHttpRequest();
  http.open("GET", url, true);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.responseText);
      let html = "";
      res.detalle.forEach((row) => {
        html += `<tr>
        <td>${row["id"]}</td>
        <td>${row["descripcion"]}</td>
        <td>${row["cantidad"]}</td>
        <td><input class="form-control" placeholder="Desc" type="text" onkeyup="calcularDescuento(event, ${row["id"]})"></td>
        <td>${row["descuento"]}</td>
        <td>${row["precio"]}</td>
        <td>${row["sub_total"]}</td>
        <td>
        <button class="btn btn-danger" type="button" onclick="deleteDetalle(${row["id"]}, 2)">
        <i class="fas fa-trash-alt"></i></button>
        </td>
        </tr>`;
      });
      document.getElementById("tblDetalleVenta").innerHTML = html;
      document.getElementById("total").value = res.total_pagar.total;
    }
  };
}

function calcularDescuento(e, id) {
  e.preventDefault();
  if (e.target.value == ''){
    alertas('Ingrese el descuento', 'warning');
  } else{
    if (e.which == 13){
      const url= base_url + "Compras/calcularDescuento/" + id + "/" + e.target.value;
      const http = new XMLHttpRequest();
      http.open("GET", url, true);
      http.send();
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          const res = JSON.parse(this.responseText);
          cargarDetalleVenta();
          alertas(res.msg, res.icono);
        }
      }
    }
  }
}

function deleteDetalle(id, accion) {
  let url;
  if (accion == 1){
    url = base_url + "Compras/delete/" + id;
  } else{
    url = base_url + "Compras/deleteVenta/" + id;
  }
  const http = new XMLHttpRequest();
  http.open("GET", url, true);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.responseText);
      alertas(res.msg, res.icono);
      if (accion == 1){
        cargarDetalle();
      } else{
        cargarDetalleVenta();
      }
      if (res == "ok") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Producto eliminado",
          showConfirmButton: false,
          timer: 3000,
        })
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al eliminar producto",
          showConfirmButton: false,
          timer: 3000,
        })
      }
    }
  }
}

//Fin Productos

function procesar(accion) {
  
  Swal.fire({
    title: "Estas seguro de realizar la compra?",
    icon: "success",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si!",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      let url;
      if (accion == 1){
        url = base_url + "Compras/registrarCompra/";
      } else{
        const id_cliente = document.getElementById('cliente').value;
        url = base_url + "Compras/registrarVenta/"+id_cliente;
      }
      
      const http = new XMLHttpRequest();
      http.open("GET", url, true);
      http.send();
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(this.responseText);
          
          if (res.msg == "ok") {
            alertas(res.msg, res.icono);
            let ruta;
            if (accion == 1) {
              ruta = base_url + "Compras/generarPdf/" + res.id_compra;
            }else{
              ruta = base_url + "Compras/generarPdfVenta/" + res.id_venta;
            }
            window.open(ruta);
            setTimeout(() => {
              window.location.reload();
            }, 300);
          } else {
            alertas(res.msg, res.icono);
          }
        }
      }
    }
  });
}

function modificarEmpresa() {
  const frm = document.getElementById("frmEmpresa");
  const url = base_url + "Administracion/modificar/";
  const http = new XMLHttpRequest();
  http.open("POST", url, true);
  http.send(new FormData(frm));
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.responseText);
      if (res == "ok") {
        alert("Modificado");
      }
    }
  }
}

function alertas(mensaje, icono) {
  Swal.fire({
    position: "top-end",
    icon: icono,
    title: mensaje,
    showConfirmButton: false,
    timer: 3000,
  })
}

if (document.getElementById('stockMinimo')){
  reporteStock();
  productosVendidos();
}

function reporteStock(){
  const url = base_url + "Administracion/reporteStock";
  const http = new XMLHttpRequest();
  http.open("GET", url, true);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.responseText);
      let nombre = [];
      let cantidad= [];
      for (let i = 0; i < res.length; i++) {
        nombre.push(res[i]['descripcion']);
        cantidad.push(res[i]['cantidad']);
      }
      var ctx = document.getElementById("stockMinimo");
      var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: nombre,
          datasets: [{
            data: cantidad,
            backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745', '#ff8f00', '#dcff00', '#00ffcd', '#c2c0fd', '#ea55e3', '#df7070']
          }]
        }
      })
    }
  }
}

function productosVendidos(){
  const url = base_url + "Administracion/productosVendidos";
  const http = new XMLHttpRequest();
  http.open("GET", url, true);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.responseText);
      let nombre = [];
      let cantidad= [];
      for (let i = 0; i < res.length; i++) {
        nombre.push(res[i]['descripcion']);
        cantidad.push(res[i]['total']);
      }
      var ctx = document.getElementById("productosVendidos");
      var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: nombre,
          datasets: [{
            data: cantidad,
            backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745', '#ff8f00', '#dcff00', '#00ffcd', '#c2c0fd', '#ea55e3', '#df7070']
          }]
        }
      })
    }
  }
}

