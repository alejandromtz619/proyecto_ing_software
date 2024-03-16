let tblUsuarios, tblClientes, tblCajas, tblCategorias, tblMedidas, tblProductos;
document.addEventListener("DOMContentLoaded", function () {
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
      }
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
      }
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
      }
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
});

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
  const clave = document.getElementById("clave");
  const confirmar = document.getElementById("confirmar");
  const caja = document.getElementById("caja");
  if (usuario.value == "" || nombre.value == "" || caja.value == "") {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Todos los campos son obligatorios",
      showConfirmButton: false,
      timer: 3000,
    });
  } else {
    const url = base_url + "Usuarios/registrar";
    const frm = document.getElementById("frmUsuario");
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
            title: "Usuario registrado con éxito",
            showConfirmButton: false,
            timer: 3000,
          });
          frm.reset();
          $("#nuevo_usuario").modal("hide");
          tblUsuarios.ajax.reload();
        } else if (res == "modificado") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Usuario modificado correctamente",
            showConfirmButton: false,
            timer: 3000,
          });
          $("#nuevo_usuario").modal("hide");
          tblUsuarios.ajax.reload();
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
          if (res == "ok") {
            Swal.fire("Mensaje!", "Usuario eliminado con exito.", "success");
            tblUsuarios.ajax.reload();
          } else {
            Swal.fire("Mensaje!", res, "error");
          }
        }
      };
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
          if (res == "ok") {
            Swal.fire("Mensaje!", "Usuario reingresado con exito.", "success");
            tblUsuarios.ajax.reload();
          } else {
            Swal.fire("Mensaje!", res, "error");
          }
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
  }
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
    })
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
          })
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
          })
          $("#nuevo_categoria").modal("hide");
          tblCategorias.ajax.reload();
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: res,
            showConfirmButton: false,
            timer: 3000,
          })
        }
      }
    }
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
  }
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
      }
    }
  })
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
      }
    }
  })
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
          })
        }
      }
    }
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
  }
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
      timer: 3000
    })
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
            Swal.fire(
              "Mensaje!",
              "Caja reingresada con exito.",
              "success"
            );
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

  if (codigo.value == "" || descripcion.value == "" || precio_compra.value == "" || precio_venta.value == "" ||  id_medida.value == "" ||  id_cat.value == "" ) {
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
      document.getElementById("img-preview").src = base_url + 'Assets/img/'+ res.foto;
      document.getElementById("icon-cerrar").innerHTML = 
      `<button class="btn btn-danger" onclick="deleteImg();"><i class="fas fa-times"></i></button>`;
      document.getElementById("icon-image").classList.add("d-none");
      document.getElementById("foto_actual").value= res.foto;
      document.getElementById("foto_delete").value= res.foto;
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
            Swal.fire('Mensaje!', 'Producto reingresado con exito.', 'success')
            tblProductos.ajax.reload();
          } else {
            Swal.fire("Mensaje!", res, "error")
          }
        }
      }
    }
  })
}

function preview(e){
  const url = e.target.files[0];
  const urlTmp = URL.createObjectURL(url);
  document.getElementById("img-preview").src = urlTmp;
  document.getElementById("icon-image").classList.add("d-none");
  document.getElementById("icon-cerrar").innerHTML = 
  `<button class="btn btn-danger" onclick="deleteImg();"><i class="fas fa-times"></i></button>
  ${url['name']}`;
}

function deleteImg(){
  document.getElementById("icon-cerrar").innerHTML = '';
  document.getElementById("icon-image").classList.remove("d-none");
  document.getElementById("img-preview").src = '';
  document.getElementById("imagen").value = '';
  document.getElementById("foto_delete").value = '';

}

//Fin Productos

