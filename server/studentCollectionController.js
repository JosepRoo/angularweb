'use strict';
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const dbName = 'info_tec';

//Regresar consolas
exports.getConsolas = function(req, res){
  MongoClient.connect(url, function(err, mdbclient) {
    if (err){
      throw err;
    }
    const db = mdbclient.db(dbName);

    //Regresar todas las consolas
    db.collection("consolas").find().project().toArray(function(err, result) {
      if (err){
        throw err;
      }
      //console.log("Consola encontrada: " + consolaRecibida);
      mdbclient.close();
      res.end( JSON.stringify(result));
    });
  });
};

//Obtener el nombre, imagen, y ficha técnica de una plataforma en específico, por medio de su id
exports.obtenerPrimer = function(req, res) {
  MongoClient.connect(url, function(err, mdbclient) {
    if (err){
      throw err;
    }
    const db = mdbclient.db(dbName);

    var consolaRecibida = req.params.consola;
    //db.consolas.find({"nombre":"Xbox"},{"nombre":1, "fichaTecnica":1, "imagen":1})
    db.collection("consolas").find({nombre:consolaRecibida}).project({_id:0, nombre:1, fichaTecnica:1, imagen:1}).toArray(function(err, result) {
      if (err){
        throw err;
      }
      console.log("Consola encontrada: " + consolaRecibida);
      mdbclient.close();
      res.end( JSON.stringify(result));
    });
  });
};

//Obtener una lista de plataformas (nombre, imagen, y ficha técnica) por medio de una búsqueda con expresión regular.
exports.buscar_palabra_clave = function(req, res) {
  MongoClient.connect(url, function(err, mdbclient) {
    if (err){
      throw err;
    }
    const db = mdbclient.db(dbName);
    var palabraClave = req.params.palabraClave;
    db.collection("consolas").find({nombre:new RegExp(palabraClave,'i')}).project({_id:0, nombre:1, fichaTecnica:1, imagen:1}).toArray(function(err, result) {
      if (err){
        throw err;
      }
      console.log("Resultados obtenidos: " + result.length);
      mdbclient.close();
      res.end( JSON.stringify(result));
    });
  });
};

//Obtener la lista de juegos de una plataforma en específico, por medio de su id o nombre, obteniendo la siguiente información por cada juego:
//Nombre
//Imagen de portada
exports.obtenerJuegos = function(req, res) {
  MongoClient.connect(url, function(err, mdbclient) {
    if (err){
      throw err;
    }
    const db = mdbclient.db(dbName);

    var consolaRecibida = req.params.consola;
    db.collection("consolas").find({nombre:consolaRecibida}).project({ _id:0, "juegos.nombre": 1, "juegos.portada": 1 ,"juegos._id":1}).toArray(function(err, result) {
      if (err){
        throw err;
      }
      console.log("Consola encontrada: " + consolaRecibida);
      mdbclient.close();
      res.end( JSON.stringify(result));
    });
  });
};

exports.obtenerTodosJuegos = function(req, res) {
  MongoClient.connect(url, function(err, mdbclient) {
    if (err){
      throw err;
    }
    const db = mdbclient.db(dbName);

    var consolaRecibida = req.params.consola;
    db.collection("consolas").find({nombre:"Xbox"}).project({ _id:0, "juegos.nombre": 1, "juegos.portada": 1 }).toArray(function(err, result) {
      if (err){
        throw err;
      }
      console.log("Consola encontrada: " + consolaRecibida);
      mdbclient.close();
      res.end( JSON.stringify(result));
    });
  });
};

//Obtener una lista de juegos (nombre, e imagen de portada) por medio de una búsqueda con expresión regular.
exports.buscar_palabra_clave_juegos = function(req, res) {
  MongoClient.connect(url, function(err, mdbclient) {
    if (err){
      throw err;
    }
    const db = mdbclient.db(dbName);
    var palabraClave = req.params.palabraClave;
    console.log(palabraClave);
    db.collection("consolas").find({nombre:new RegExp(palabraClave,'i')}).project({ _id:0, "juegos.nombre": 1, "juegos.portada": 1 }).toArray(function(err, result) {
      if (err){
        throw err;
      }
      console.log("Resultados obtenidos: " + result.length);
      mdbclient.close();
      res.end( JSON.stringify(result));
    });
  });
};

//Obtener info juego
exports.infoJuego = function(req, res) {
  MongoClient.connect(url, function(err, mdbclient) {
  if (err){
    throw err;
   }
   const db = mdbclient.db(dbName);

   var claveJuego = req.params.idjuego;
   console.log("clave juego", claveJuego);
   claveJuego = Number(claveJuego);
   db.collection("consolas").findOne({"juegos._id":claveJuego},{_id:0,juegos:{"$elemMatch":{_id:claveJuego}}}, function(err, result) {

     if (err){
      throw err;
     }

     mdbclient.close();
     console.log("res", result);


     //Regresamos solamente la materia que corresponde a la clave.
     if(result){
       for (var i = 0; i < result.juegos.length; i++){
         //Si encontramos el juego que corresponde a la clave, regresamos solo ese elemento.
         if (result.juegos[i]._id == claveJuego){
             console.log("Consulta ejecutada...");
             mdbclient.close();
             res.end( JSON.stringify(result.juegos[i]));
         }
       }
     }else{
        res.end(null);
     }
  });
  });
};



//Obtener Entradas de blog
exports.obtenerBlogs = function(req, res) {
  MongoClient.connect(url, function(err, mdbclient) {
    if (err){
      throw err;
    }
    const db = mdbclient.db(dbName);
    db.collection("blog").find().project().toArray(function(err, result) {
      if (err){
        throw err;
      }

      mdbclient.close();
      res.end( JSON.stringify(result));
    });
  });
};

//Obtener una lista de juegos
/*exports.buscar_palabra_clave_juegos = function(req, res) {
  MongoClient.connect(url, function(err, mdbclient) {
    if (err){
      throw err;
    }
    const db = mdbclient.db(dbName);
    var palabraClaveJuego = req.params.palabraClaveJuego;
    db.collection("consolas").find({"juegos.nombre":new RegExp(palabraClaveJuego,'i')}).project({_id:0, "juegos.nombre":1, "juegos.lanzamiento":1}).toArray(function(err, result) {
      if (err){
        throw err;
      }
      console.log("Resultados obtenidos: " + result.length);
      mdbclient.close();
      res.end( JSON.stringify(result));
    });
  });
};*/

//Obtener info juego
exports.buscar_palabra_clave_juegos = function(req, res) {
  MongoClient.connect(url, function(err, mdbclient) {
  if (err){
    throw err;
   }
   const db = mdbclient.db(dbName);

   var palabraClaveJuego = req.params.palabraClaveJuego;

   db.collection("consolas").findOne({"juegos.nombre":new RegExp(palabraClaveJuego,'i')}, {fields:{_id:0, juegos:1}}, function(err, result) {

     if (err){
      throw err;
     }

     mdbclient.close();

     //Regresamos solamente el juego que corresponde al nombre.
     if(result){
       for (var i = 0; i < result.juegos.length; i++){
         //Si encontramos el juego que corresponde a la clave, regresamos solo ese elemento.
         if (result.juegos[i].nombre.match(new RegExp(palabraClaveJuego,'i'))){
             //console.log(result.juegos[i].nombre);
             console.log("Consulta ejecutada...");
             mdbclient.close();
             res.end( JSON.stringify(result.juegos[i]));
         }
       }
     }else{
        res.end(null);
     }
  });
  });
};
