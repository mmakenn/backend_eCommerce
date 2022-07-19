import app from "./server.js";

//--------------------------------------------
// inicio el servidor
const PORT = 8080;
const connectedServer = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
});
connectedServer.on('error', error => console.log(`Error en servidor ${error}`));