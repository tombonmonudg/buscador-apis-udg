const express = require('express');
const path = require('path');
const app = express();

// Heroku asigna el puerto dinámicamente en process.env.PORT
const PORT = process.env.PORT || 3000;

// Le decimos a Express que sirva los archivos estáticos de esta carpeta
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
    console.log(`Servidor de pruebas efímero corriendo en el puerto ${PORT}`);
});