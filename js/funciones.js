"use strict"
import {
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    query,
    where,
    orderBy,
    arrayUnion,
  } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
  
  const d = document;

export const obtenerProductos = async (coleccionProductos, coleccionListas) => {
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
        var boton = d.createElement("button");
        boton.id = producto.id;
        boton.class = "add";
        boton.innerHTML="Añadir a la lista";
        boton.addEventListener(
            "click",
            (event) => {
                seleccionarLista(coleccionListas, coleccionProductos, event.target.id);
            },
            false
        )
        var td = d.createElement("td");
        td.appendChild(boton);
        fila.appendChild(td);
        tabla.appendChild(fila);
    })
}

export const obtenerProductosFiltrado = async (coleccionProductos, coleccionListas, filtro, campo) => {
    if (filtro != "") {
    d.getElementById("contenedor").innerHTML="";
    const consulta = query(
        coleccionProductos,
        where(campo, "==", filtro)
    );
    const productos = await getDocs(consulta);
    var tabla = d.createElement("table");
    d.getElementById("contenedor").appendChild(tabla);
    var cabTabla = d.createElement("tr");
    cabTabla.innerHTML="<th>Portada</th><th>Nombre</th><th>Editorial</th><th>Precio</th><th>Paginas</th><th></th>";
    tabla.appendChild(cabTabla);
    productos.docs.map((producto) => {
        var fila = d.createElement("tr");
        fila.innerHTML = "<td><img src='"+producto.data().Portada+"'><td>"+producto.data().Nombre+"<td>"+producto.data().Editorial+"<td>"+producto.data().Precio+" €<td>"+producto.data().Paginas;
        var boton = d.createElement("button");
        boton.id = producto.id;
        boton.class = "add";
        boton.innerHTML="Añadir a la lista";
        boton.addEventListener(
            "click",
            (event) => {
                seleccionarLista(coleccionListas, coleccionProductos, event.target.id);
            },
            false
        )
        var td = d.createElement("td");
        td.appendChild(boton);
        fila.appendChild(td);
        tabla.appendChild(fila);
    })
}
}

export const obtenerProductosOrdenados = async (coleccionProductos, coleccionListas, orden, ascdesc) => {
    if (orden != "") {
    d.getElementById("contenedor").innerHTML="";
    const consulta = query(
        coleccionProductos,
        orderBy(orden, ascdesc)
    );
    const productos = await getDocs(consulta);
    var tabla = d.createElement("table");
    d.getElementById("contenedor").appendChild(tabla);
    var cabTabla = d.createElement("tr");
    cabTabla.innerHTML="<th>Portada</th><th>Nombre</th><th>Editorial</th><th>Precio</th><th>Paginas</th><th></th>";
    tabla.appendChild(cabTabla);
    productos.docs.map((producto) => {
        var fila = d.createElement("tr");
        fila.innerHTML = "<td><img src='"+producto.data().Portada+"'><td>"+producto.data().Nombre+"<td>"+producto.data().Editorial+"<td>"+producto.data().Precio+" €<td>"+producto.data().Paginas;
        var boton = d.createElement("button");
        boton.id = producto.id;
        boton.class = "add";
        boton.innerHTML="Añadir a la lista";
        boton.addEventListener(
            "click",
            (event) => {
                seleccionarLista(coleccionListas, coleccionProductos, event.target.id);
            },
            false
        )
        var td = d.createElement("td");
        td.appendChild(boton);
        fila.appendChild(td);
        tabla.appendChild(fila);
    })
}
}

export const listarListas = async (coleccionListas, coleccionProductos) => {
    d.getElementById("contenedor").innerHTML="";
    const listas = await getDocs(coleccionListas);
    var tabla = d.createElement("table");
    d.getElementById("contenedor").appendChild(tabla);
    var cabTabla = d.createElement("tr");
    cabTabla.innerHTML="<th>Nombre</th><th>Propietario</th><th>Fecha</th><th>Articulos</th>";
    tabla.appendChild(cabTabla);
    listas.docs.map((lista) => {
        var fila = d.createElement("tr");
        fila.innerHTML = "<td>"+lista.data().Nombre+"<td>"+lista.data().Propietario+"<td>"+lista.data().Fecha;
        var boton = d.createElement("button");
        boton.id = lista.id;
        boton.class = "detalle";
        boton.innerHTML="Detalle productos";
        boton.addEventListener(
            "click",
            (event) => {
                d.getElementById("contenedor").innerHTML="";
                    mostrarProductosLista(coleccionListas, coleccionProductos, event.target.id);
            },
            false
        )
        var td = d.createElement("td");
        td.appendChild(boton);
        fila.appendChild(td);
        tabla.appendChild(fila);
    })
}

export const mostrarProductosLista = async (colListas, colProductos, idLista) => {
    d.getElementById("contenedor").innerHTML="";
    const listacs = await doc(colListas, idLista);
    const lista = await getDoc(listacs);
    const productos = await getDocs(colProductos);
    var tabla = d.createElement("table");
    d.getElementById("contenedor").appendChild(tabla);
    var titulo = d.createElement("tr");
    titulo.innerHTML="<th colspan='7'>"+lista.data().Nombre+"</th>";
    tabla.appendChild(titulo);
    var cabTabla = d.createElement("tr");
    cabTabla.innerHTML="<th>Portada</th><th>Nombre</th><th>Editorial</th><th>Precio</th><th>Paginas</th><th>Cantidad</th><th></th>";
    tabla.appendChild(cabTabla);
    productos.docs.map((producto) => {
        for (let j = 0; j < lista.data().Articulos.length; j++) {
            if (lista.data().Articulos[j].Articulo==producto.data().Nombre) {
                var fila = d.createElement("tr");
                fila.innerHTML = "<td><img src='"+producto.data().Portada+"'><td>"+producto.data().Nombre+"<td>"+producto.data().Editorial+"<td>"+producto.data().Precio+" €<td>"+producto.data().Paginas+"<td>"+lista.data().Articulos[j].Cantidad;
                var td = d.createElement("td");
                if (lista.data().Articulos[j].Cantidad>1) {
                    var input = d.createElement("input");
                    input.type = "number";
                    input.min = 1;
                    input.max = lista.data().Articulos[j].Cantidad-1;
                    input.name = producto.data().Nombre;
                    var elim = d.createElement("button");
                    elim.innerHTML="Eliminar";
                    elim.addEventListener(
                        "click",
                        async function (event) {
                            if (input.value > 0 && input.value < lista.data().Articulos[j].Cantidad){
                            await eliminar(colListas, idLista, producto.data().Nombre, input.value);
                            mostrarProductosLista(colListas, colProductos, idLista);
                            }
                        },false
                    );
                    td.appendChild(input);
                    td.appendChild(elim);
                }
                var elimTod = d.createElement("button");
                elimTod.innerHTML="Eliminar todos";
                elimTod.addEventListener(
                    "click",
                    async function (event) {
                        await eliminarTodos(colListas, idLista, producto.data().Nombre);
                        mostrarProductosLista(colListas, colProductos, idLista);
                    },false
                )
                td.appendChild(elimTod);
                fila.appendChild(td);
                tabla.appendChild(fila);
            }  
        }
    })
}

export function imprimirFormulario(coleccionListas, coleccionProductos) {
    d.getElementById("contenedor").innerHTML="";
    var labNombre = d.createElement("label");
    labNombre.setAttribute("for", "nombre");
    labNombre.innerHTML = "Nombre:";
    var nombre = d.createElement("input");
    nombre.type = "text";
    nombre.name = "nombre";
    d.getElementById("contenedor").appendChild(labNombre);
    d.getElementById("contenedor").appendChild(nombre);
    var labProp = d.createElement("label");
    labProp.setAttribute("for", "propietario");
    labProp.innerHTML = "Propietario:";
    var propietario = d.createElement("input");
    propietario.type = "text";
    propietario.name = "propietario";
    d.getElementById("contenedor").appendChild(labProp);
    d.getElementById("contenedor").appendChild(propietario);
    var boton = d.createElement("button");
    boton.innerHTML="Guardar";
    d.getElementById("contenedor").appendChild(boton);
    boton.addEventListener(
        "click",
        (event) => {
            crearLista(nombre.value, propietario.value, coleccionListas);
            listarListas(coleccionListas, coleccionProductos);
        },
        false
    )
}

export const crearLista = async (nombre, propietario, coleccion) => {
    var lista = {
        Nombre: nombre,
        Propietario: propietario,
        Fecha: Date(),
        Articulos: {},
    };
    const guardado = await addDoc(coleccion, lista);
}

export const seleccionarLista = async (coleccionListas, coleccionProductos, idProducto) => {
    d.getElementById("contenedor").innerHTML="";
    var titulo = d.createElement("h1");
    titulo.innerHTML = "Seleccione a que lista añadir el producto";
    d.getElementById("contenedor").appendChild(titulo);
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
        boton.class = "select";
        boton.innerHTML="Seleccionar lista";
        boton.addEventListener(
            "click",
            (event) => {
                addProducto(coleccionListas, coleccionProductos, idProducto, lista.id);
            },
            false
        )
        var td = d.createElement("td");
        td.appendChild(boton);
        fila.appendChild(td);
        tabla.appendChild(fila);
    })
}

export const addProducto = async (coleccionListas, coleccionProductos, idProducto, idLista) => {
    var lista = await getDoc(doc(coleccionListas, idLista));
    const producto = await getDoc(doc(coleccionProductos, idProducto));
    var exist = false;
    var articulos = [];
    if(lista.data().Articulos.length!==0){
    lista.data().Articulos.map((artList) => {
        if (artList.Articulo==producto.data().Nombre) {
            articulos.push({
                Cantidad: artList.Cantidad+1,
                Articulo: artList.Articulo,
            })
            exist = true;
            
        }
        else {
            articulos.push({
                Cantidad: artList.Cantidad,
                Articulo: artList.Articulo,
            })
        }
    })
    }
    if (!exist) {
        await updateDoc(doc(coleccionListas, idLista), {
            Articulos: arrayUnion({
                Articulo: producto.data().Nombre,
                Cantidad: 1,
            }),
        })
    }
    else{
        await updateDoc(doc(coleccionListas, idLista), {
            Articulos: articulos,
        });
    }
    obtenerProductos(coleccionProductos, coleccionListas);
}

export const eliminar = async (coleccionListas, idLista, producto, cantidad) => {
    var lista = await getDoc(doc(coleccionListas, idLista));
    var articulos = [];
    if(lista.data().Articulos.length!==0){
    lista.data().Articulos.map((artList) => {
        if (artList.Articulo==producto) {
            articulos.push({
                Cantidad: artList.Cantidad-cantidad,
                Articulo: artList.Articulo,
            })
            
        }
        else {
            articulos.push({
                Cantidad: artList.Cantidad,
                Articulo: artList.Articulo,
            })
        }
    })
    }
    await updateDoc(doc(coleccionListas, idLista), {
        Articulos: articulos,
    });
}

export const eliminarTodos = async (coleccionListas, idLista, producto) => {
    var lista = await getDoc(doc(coleccionListas, idLista));
    var articulos = [];
    if(lista.data().Articulos.length!==0){
    lista.data().Articulos.map((artList) => {
        if (artList.Articulo!==producto) {
            articulos.push({
                Cantidad: artList.Cantidad,
                Articulo: artList.Articulo,
            })
            
        }
    })
    }
    await updateDoc(doc(coleccionListas, idLista), {
        Articulos: articulos,
    });
} 