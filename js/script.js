"use strict";
import { listarListas, obtenerProductos, obtenerProductosFiltrado, obtenerProductosOrdenados, mostrarProductosLista, imprimirFormulario, crearLista, } from "./funciones.js";
import { acceder } from "./admin.js";
import { app, autentificacion } from "./datosFirebase.js";
import {
  getFirestore,
  collection,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import {
    signOut,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { mostrarInicio } from "./auth.js";

window.onload = () => {

    var d = document;

    const db = getFirestore(app);
    const coleccionProductos = collection(db, "ProductosComics");
    const coleccionListas = collection(db, "ListasComics");

    mostrarInicio(autentificacion);

    d.getElementById("todo").addEventListener(
        "click",
        (event) => {
            obtenerProductos(coleccionProductos, coleccionListas);
        },
        false
    );

    d.getElementById("filtrar").addEventListener(
        "click",
        (event) => {
            var filtro = d.getElementById("filtro").value;
            var campoFiltro = d.getElementById("campoFiltro").value;
            obtenerProductosFiltrado(coleccionProductos, coleccionListas, filtro, campoFiltro);
        },
        false
    );
    
    d.getElementById("ordenar").addEventListener(
        "click",
        (event) => {
            var orden = d.getElementById("orden").value;
            var ascdesc = d.getElementById("ascdesc").value;
            obtenerProductosOrdenados(coleccionProductos, coleccionListas, orden, ascdesc);
        },
        false
    );

    d.getElementById("listas").addEventListener(
        "click",
        (event) => {
            listarListas(coleccionListas, coleccionProductos);
        },
        false
    );

    d.getElementById("crearLista").addEventListener(
        "click",
        (event) => {
            imprimirFormulario(coleccionListas, coleccionProductos);
        },
        false
    );

    d.getElementById("admin").addEventListener(
        "click",
        (event) => {
            acceder(coleccionListas, coleccionProductos);
        },
        false
    )

    d.getElementById("salir").addEventListener(
        "click",
        (event) => {
            autentificacion
            .signOut()
            .then(() => {
                mostrarInicio(autentificacion);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    )

};