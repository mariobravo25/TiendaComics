"use strict"
import {
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
  } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { obtenerProductos } from "./funciones.js";
  
  const d = document;

export const acceder = (coleccionListas, coleccionProductos) => {
    d.getElementById("contenedor").innerHTML="<h2>Introduce la contraseña para acceder a las opciones de administrador:</h2><input type='password' id='contra' name='contra'><br>";
    var boton = d.createElement("button");
    boton.innerHTML = "Acceder";
    boton.addEventListener(
        "click",
        (event) => {
            if (d.getElementById("contra").value == "admin") {
                mostrarOpciones(coleccionProductos, coleccionListas);
            }
            else {
                d.getElementById("contenedor").innerHTML="<h2>La contraseña es erronea</h2><h2>Redireccionando a página principal</h2>";
                setTimeout(() => {obtenerProductos(coleccionProductos, coleccionListas);}, 3000);
            }
        },false
    )
    d.getElementById("contenedor").appendChild(boton);
}

export const mostrarOpciones = (coleccionProductos, coleccionListas) => {
    var contenedor = d.getElementById("contenedor")
    contenedor.innerHTML="";
    var add = d.createElement("button");
    add.innerHTML = "Añadir nuevo producto";
    add.addEventListener(
        "click",
        (event) => {
            formularioNuevoProducto(coleccionProductos);
        },false
    )
    var mod = d.createElement("button");
    mod.innerHTML = "Modificar producto existente";
    mod.addEventListener(
        "click",
        (event) => {
            seleccionarProducto(coleccionProductos, "modificar");
        }
    )
    var elim = d.createElement("button");
    elim.innerHTML = "Eliminar producto existente";
    elim.addEventListener(
        "click",
        (event) => {
            seleccionarProducto(coleccionProductos, "borrar");
        }
    )
    var elimLista = d.createElement("button");
    elimLista.innerHTML = "Eliminar lista existente";
    elimLista.addEventListener(
        "click",
        (event) => {
            seleccionarListaElim(coleccionListas);
        }
    )
    contenedor.appendChild(add);
    contenedor.appendChild(d.createElement("br"));
    contenedor.appendChild(mod);
    contenedor.appendChild(d.createElement("br"));
    contenedor.appendChild(elim);
    contenedor.appendChild(d.createElement("br"));
    contenedor.appendChild(elimLista);
}

export const formularioNuevoProducto = (coleccionProductos) => {
    var contenedor = d.getElementById("contenedor")
    contenedor.innerHTML="";
    var labNombre = d.createElement("label");
    labNombre.setAttribute("for", "nombre");
    labNombre.innerHTML = "Nombre:";
    var nombre = d.createElement("input");
    nombre.type = "text";
    nombre.name = "nombre";
    var labEditorial = d.createElement("label");
    labEditorial.setAttribute("for", "editorial");
    labEditorial.innerHTML = "Editorial:";
    var editorial = d.createElement("input");
    editorial.type = "text";
    editorial.name = "editorial";
    var labPrecio = d.createElement("label");
    labPrecio.setAttribute("for", "precio");
    labPrecio.innerHTML = "Precio:";
    var precio = d.createElement("input");
    precio.type = "number";
    precio.min = 0;
    precio.name = "precio";
    var labPaginas = d.createElement("label");
    labPaginas.setAttribute("for", "paginas");
    labPaginas.innerHTML = "Páginas:";
    var paginas = d.createElement("input");
    paginas.type = "number";
    paginas.min = 1;
    paginas.name = "paginas";
    var labPortada = d.createElement("label");
    labPortada.setAttribute("for", "portada");
    labPortada.innerHTML = "Portada (ruta):";
    var portada = d.createElement("input");
    portada.type = "text";
    portada.placeholder="./img/ejemplo.jpg";
    portada.name = "portada";
    contenedor.appendChild(labNombre);
    contenedor.appendChild(nombre);
    contenedor.appendChild(d.createElement("br"));
    contenedor.appendChild(labEditorial);
    contenedor.appendChild(editorial);
    contenedor.appendChild(d.createElement("br"));
    contenedor.appendChild(labPrecio);
    contenedor.appendChild(precio);
    contenedor.appendChild(d.createElement("br"));
    contenedor.appendChild(labPaginas);
    contenedor.appendChild(paginas);
    contenedor.appendChild(d.createElement("br"));
    contenedor.appendChild(labPortada);
    contenedor.appendChild(portada);
    contenedor.appendChild(d.createElement("br"));
    var boton = d.createElement("button");
    boton.innerHTML = "Enviar";
    boton.addEventListener(
        "click",
        (event) => {
            if (precio.value > 0 && paginas.value > 1) {
                addProdcutoTienda(coleccionProductos, nombre.value, editorial.value, precio.value, paginas.value, portada.value);
            }
        },false
    )
    contenedor.appendChild(boton);
}

export const addProdcutoTienda = async (coleccionProductos, nombre, editorial, precio, paginas, portada) => {
    var producto = {
        Nombre: nombre,
        Editorial: editorial,
        Precio: precio,
        Paginas: paginas,
        Portada: portada,
    }
    await addDoc(coleccionProductos, producto);
    d.getElementById("contenedor").innerHTML="<h2>Producto con el nombre "+nombre+" añadido a la base de datos</h2>";
}

export const seleccionarProducto = async (coleccionProductos, opcion) => {
    d.getElementById("contenedor").innerHTML="";
    const productos = await getDocs(coleccionProductos);
    var tabla = d.createElement("table");
    d.getElementById("contenedor").appendChild(tabla);
    var cabTabla = d.createElement("tr");
    cabTabla.innerHTML="<th>Portada</th><th>Nombre</th><th>Editorial</th><th>Precio</th><th>Paginas</th><th></th>"
    tabla.appendChild(cabTabla);
    productos.docs.map((producto) => {
        var fila = d.createElement("tr");
        fila.innerHTML = "<td><img src='"+producto.data().Portada+"'><td>"+producto.data().Nombre+"<td>"+producto.data().Editorial+"<td>"+producto.data().Precio+" €<td>"+producto.data().Paginas;
        if (opcion == "modificar") {
            var boton = d.createElement("button");
            boton.id = producto.id;
            boton.class = "mod";
            boton.innerHTML="Modificar producto";
            boton.addEventListener(
                "click",
                (event) => {
                    formularioModProducto(coleccionProductos, producto.id);
                },
                false
            )
        }
        else if (opcion == "borrar") {
            var boton = d.createElement("button");
            boton.id = producto.id;
            boton.class = "del";
            boton.innerHTML="Borrar producto";
            boton.addEventListener(
                "click",
                (event) => {
                    borrarProducto(coleccionProductos, producto.id);
                },
                false
            )
        }
        var td = d.createElement("td");
        td.appendChild(boton);
        fila.appendChild(td);
        tabla.appendChild(fila);
    })
}

export const formularioModProducto = async (coleccionProductos, idProducto) => {
    const producto = await getDoc(doc(coleccionProductos, idProducto));
    var contenedor = d.getElementById("contenedor")
    contenedor.innerHTML="";
    var labNombre = d.createElement("label");
    labNombre.setAttribute("for", "nombre");
    labNombre.innerHTML = "Nombre:";
    var nombre = d.createElement("input");
    nombre.type = "text";
    nombre.name = "nombre";
    nombre.value = producto.data().Nombre;
    var labEditorial = d.createElement("label");
    labEditorial.setAttribute("for", "editorial");
    labEditorial.innerHTML = "Editorial:";
    var editorial = d.createElement("input");
    editorial.type = "text";
    editorial.name = "editorial";
    editorial.value = producto.data().Editorial;
    var labPrecio = d.createElement("label");
    labPrecio.setAttribute("for", "precio");
    labPrecio.innerHTML = "Precio:";
    var precio = d.createElement("input");
    precio.type = "number";
    precio.min = 0;
    precio.name = "precio";
    precio.value = producto.data().Precio;
    var labPaginas = d.createElement("label");
    labPaginas.setAttribute("for", "paginas");
    labPaginas.innerHTML = "Páginas:";
    var paginas = d.createElement("input");
    paginas.type = "number";
    paginas.min = 1;
    paginas.name = "paginas";
    paginas.value = producto.data().Paginas;
    var labPortada = d.createElement("label");
    labPortada.setAttribute("for", "portada");
    labPortada.innerHTML = "Portada (ruta):";
    var portada = d.createElement("input");
    portada.type = "text";
    portada.placeholder="./img/ejemplo.jpg";
    portada.name = "portada";
    portada.value = producto.data().Portada;
    contenedor.appendChild(labNombre);
    contenedor.appendChild(nombre);
    contenedor.appendChild(d.createElement("br"));
    contenedor.appendChild(labEditorial);
    contenedor.appendChild(editorial);
    contenedor.appendChild(d.createElement("br"));
    contenedor.appendChild(labPrecio);
    contenedor.appendChild(precio);
    contenedor.appendChild(d.createElement("br"));
    contenedor.appendChild(labPaginas);
    contenedor.appendChild(paginas);
    contenedor.appendChild(d.createElement("br"));
    contenedor.appendChild(labPortada);
    contenedor.appendChild(portada);
    contenedor.appendChild(d.createElement("br"));
    var boton = d.createElement("button");
    boton.innerHTML = "Enviar";
    boton.addEventListener(
        "click",
        (event) => {
            if (precio.value > 0 && paginas.value > 1) {
                modificarProducto(coleccionProductos, producto.id, nombre.value, editorial.value, precio.value, paginas.value, portada.value);
            }
        },false
    )
    contenedor.appendChild(boton);
}

export const modificarProducto = async (coleccionProductos, idProducto, nombre, editorial, precio, paginas, portada) => {
    await updateDoc(doc(coleccionProductos, idProducto), {
        Nombre: nombre,
        Editorial: editorial,
        Precio: precio,
        Paginas: paginas,
        Portada: portada,
    })
    d.getElementById("contenedor").innerHTML="<h2>Producto con el nombre "+nombre+" actualizado correctamente</h2>";
}

export const borrarProducto = async (coleccionProductos, idProducto) => {
    await deleteDoc(doc(coleccionProductos, idProducto));
    d.getElementById("contenedor").innerHTML="<h2>El producto seleccionado se ha borrado correctamente</h2>";
}

export const seleccionarListaElim = async (coleccionListas) => {
    d.getElementById("contenedor").innerHTML="";
    const listas = await getDocs(coleccionListas);
    var tabla = d.createElement("table");
    d.getElementById("contenedor").appendChild(tabla);
    var cabTabla = d.createElement("tr");
    cabTabla.innerHTML="<th>Nombre</th><th>Propietario</th><th>Fecha</th><th></th>";
    tabla.appendChild(cabTabla);
    listas.docs.map((lista) => {
        var fila = d.createElement("tr");
        fila.innerHTML = "<td>"+lista.data().Nombre+"<td>"+lista.data().Propietario+"<td>"+lista.data().Fecha;
        var boton = d.createElement("button");
        boton.id = lista.id;
        boton.class = "del";
        boton.innerHTML="Borrar lista";
        boton.addEventListener(
            "click",
            (event) => {
                borrarLista(coleccionListas, lista.id);
            },
            false
        )
        var td = d.createElement("td");
        td.appendChild(boton);
        fila.appendChild(td);
        tabla.appendChild(fila);
    })
}

export const borrarLista = async (coleccionListas, idLista) => {
    await deleteDoc(doc(coleccionListas, idLista));
    d.getElementById("contenedor").innerHTML="<h2>La lista seleccionada se ha borrado correctamente</h2>";
}