'use strict';
module.exports = function(app) {
 var studentCollection = require('./studentCollectionController');

 //app.route('/videojuegos')
 //.get(studentCollection.obtener_estudiantes)
 //.post(studentCollection.agregar_estudiante);

//Primer Query
 app.route('/videojuegos/:consola')
 .get(studentCollection.obtenerPrimer);

//Segundo Query
 app.route('/videojuegos/busqueda/:palabraClave')
 .get(studentCollection.buscar_palabra_clave);

 app.route('/videojuegos/juegos/:consola')
 .get(studentCollection.obtenerJuegos);

 app.route('/videojuegos/juegosRegex/:palabraClave')
 .get(studentCollection.buscar_palabra_clave_juegos);

 app.route('/videojuegos/info/:juego')
 .get(studentCollection.infoJuego);

 app.route('/blogs')
 .get(studentCollection.obtenerBlogs);

 app.route('/consolas')
 .get(studentCollection.getConsolas);

 app.route('/juegos/:idjuego').
 get(studentCollection.infoJuego);

 app.route('/videojuegos/busqueda/juegos/:palabraClaveJuego')
 .get(studentCollection.buscar_palabra_clave_juegos);

};
