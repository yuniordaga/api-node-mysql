/* Conexion a la bds MySQL , obtencion  y muestra de los datos en una api */

//uso de dependencias contenidas en package.json
var express = require('express'); 
var mysql = require('mysql');     
var cors = require('cors');         

var app=express();         //se instancia express() en una variable app      
app.use(express.json());   //se usa para enviar datos en formato json al servidor 
app.use(cors());           //se usa para la cabecera http y los permisos

//se define y se escucha el puerto del servidor seteado en el puerto 3000
app.set('port',3000);
app.listen(app.get('port'),()=>{
        console.log("servidor OK! en el puerto ",app.get('port'))  //indica que el servidor esta funcioando
});

//creacion de la conexion a la bds Mysql mediante las credenciales
var connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'123456',
        database:'graphicos'   
});


connection.connect(function(error){
        if(error) {throw error;}
        else{console.log('Conectado a MySQL ok!');}  //indica que se tiene conexion a la bds Mysql
 }); 

//---Se definen las rutas y enviamos la informacion
//ruta incio
app.get('/',function(request,response){
        response.send('Bienvenido a INICIO ') 
 });
 //---se define la ruta de la api donde se mostrarán todos los datos obtenido del Mysql
 app.get('/api/datagrafico',(request,response)=>{
        connection.query('SELECT * from appgraph',(error,datos)=>{
                if(error) {throw error;}
                else{
                        response.send(datos);
                }
        })      
 });

