import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {

  apiKey: "AIzaSyCsLvlwCBEiJqg5nFTr-3xwqQzpIwNnfvU",

  authDomain: "cliente-1045e.firebaseapp.com",

  projectId: "cliente-1045e",

  storageBucket: "cliente-1045e.appspot.com",

  messagingSenderId: "1091200703661",

  appId: "1:1091200703661:web:c79b5b56bae90140c8fa24",

  measurementId: "G-BEJLYCG9KM"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const autentificacion = getAuth(app);

const analytics = getAnalytics(app);

export {app, autentificacion};
