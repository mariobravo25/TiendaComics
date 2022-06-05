"use strict"

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const d = document;

export const mostrarInicio = (autentificacion) => {
    d.getElementById("cabecera").classList.add("oculto");
    var contenedor = d.getElementById("contenedor");
    contenedor.innerHTML = "";
    var inicio = d.createElement("button");
    inicio.innerHTML = "Iniciar sesión";
    inicio.addEventListener(
        "click",
        (event) => {
            formularioInicioSesion(autentificacion, false);
        },false
    );
    contenedor.appendChild(inicio);
    contenedor.appendChild(d.createElement("br"));
    var crear = d.createElement("button");
    crear.innerHTML = "Crear usuario";
    crear.addEventListener(
        "click",
        (event) => {
            formularioCrearSesion(autentificacion);
        },false
    );
    contenedor.appendChild(crear);
}

export const formularioInicioSesion = (autentificacion, reintento) => {
    var contenedor = d.getElementById("contenedor");
    contenedor.innerHTML = "";
    d.getElementById("contenedor").innerHTML="";
    if (reintento == true) {
        var mensaje = d.createElement("p");
        mensaje.innerHTML = "El usuario o contraseña no son válidos";
        mensaje.classList.add("warning");
        contenedor.appendChild(mensaje);
    }
    var labUsuario = d.createElement("label");
    labUsuario.setAttribute("for", "usuario");
    labUsuario.innerHTML = "Email:";
    var usuario = d.createElement("input");
    usuario.type = "email";
    usuario.name = "usuario";
    d.getElementById("contenedor").appendChild(labUsuario);
    d.getElementById("contenedor").appendChild(usuario);
    contenedor.appendChild(d.createElement("br"));
    var labContra = d.createElement("label");
    labContra.setAttribute("for", "contra");
    labContra.innerHTML = "Contraseña:";
    var contra = d.createElement("input");
    contra.type = "password";
    contra.name = "contra";
    d.getElementById("contenedor").appendChild(labContra);
    d.getElementById("contenedor").appendChild(contra);
    contenedor.appendChild(d.createElement("br"));
    var boton = d.createElement("button");
    boton.innerHTML="Iniciar Sesión";
    d.getElementById("contenedor").appendChild(boton);
    boton.addEventListener(
        "click",
        (event) => {
            iniciarSesion(autentificacion, usuario.value, contra.value);
        },
        false
    );
}

export const iniciarSesion = (autentificacion, usuario, contra) => {
    signInWithEmailAndPassword(autentificacion, usuario, contra)
    .then(() => {
        d.getElementById("cabecera").classList.remove("oculto");
        d.getElementById("contenedor").innerHTML="<h1>Bienvenido a la tienda de comics</h1><h2>Seleccione una de las opciones del menu para continuar</h2>";
        d.getElementById("usuario").innerHTML = "Usuario activo: "+usuario;
    })
    .catch(() => {
        formularioInicioSesion(autentificacion, true);
    })
}

export const formularioCrearSesion = (autentificacion) => {
    var contenedor = d.getElementById("contenedor");
    contenedor.innerHTML = "";
    d.getElementById("contenedor").innerHTML="";
    var labUsuario = d.createElement("label");
    labUsuario.setAttribute("for", "usuario");
    labUsuario.innerHTML = "Email:";
    var usuario = d.createElement("input");
    usuario.type = "email";
    usuario.name = "usuario";
    d.getElementById("contenedor").appendChild(labUsuario);
    d.getElementById("contenedor").appendChild(usuario);
    contenedor.appendChild(d.createElement("br"));
    var labContra = d.createElement("label");
    labContra.setAttribute("for", "contra");
    labContra.innerHTML = "Contraseña (minimo 6 caracteres):";
    var contra = d.createElement("input");
    contra.type = "text";
    contra.name = "contra";
    d.getElementById("contenedor").appendChild(labContra);
    d.getElementById("contenedor").appendChild(contra);
    contenedor.appendChild(d.createElement("br"));
    var boton = d.createElement("button");
    boton.innerHTML="Crear Usuario";
    d.getElementById("contenedor").appendChild(boton);
    boton.addEventListener(
        "click",
        (event) => {
            crearUsuario(autentificacion, usuario.value, contra.value);
        },
        false
    );
}

export const crearUsuario = (autentificacion, usuario, contra) => {
    createUserWithEmailAndPassword(autentificacion, usuario, contra)
    .then((credenciales) => {
        d.getElementById("cabecera").classList.remove("oculto");
        d.getElementById("contenedor").innerHTML="<h1>Bienvenido a la tienda de comics</h1><h2>Seleccione una de las opciones del menu para continuar</h2>";
        d.getElementById("usuario").innerHTML = "Usuario activo: "+usuario;
    })
    .catch((error) => {
    console.log(error);
    });
};