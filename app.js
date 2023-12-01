var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var mv = require('mv')

const htmlContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>JC</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    margin: 40px;
                    padding: 20px;
                    background-color: #f0f0f0;
                }

                h1 {
                    color: #333;
                    text-align: center;
                }

                p {
                    color: #555;
                    text-align: justify;
                }
            </style>
        </head>
        <body>
            <h1>JC</h1>
            <p>
                Fernando Alonso es un piloto de automovilismo español, dos veces campeón del mundo de Fórmula 1.
                Es conocido por su habilidad y dedicación en las pistas de carreras, y ha dejado una marca significativa
                en el mundo del automovilismo a lo largo de su carrera.
            </p>
        </body>
        </html>
    `;


http.createServer(function (req,res){
    //Aqui va el codigo
    if(req.url == '/fileupload') {
        //RECOGER EL FICHERO
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields,files) {

            var oldpath = files.filetoupload[0].filepath;
            var newpath = 'C:/Users/jcarl/IAW/Java/2º/' + files.filetoupload.originalFilename;
            
            mv(oldpath, newpath, function (err) {
                if (err) {
                    throw err;
                } else {
                    res.write('File uploaded and moved!');
                    res.end();
                }
            });
        });
    } else if(req.url == '/jc'){

        res.write(htmlContent);
        res.end();
    } else {
        // PONER EL FORMULARIO O PÁGINA WEB DA IGUAL LA RUTA TODO PASARÍA POR AQUÍ
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<h1> prueba iaw </h1>");
        res.write('<form action="fileupload" method = "post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form');
        return res.end();
    }
}).listen(8080);