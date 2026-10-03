function filtrarUsuarios(usuarios, termino) {
    if (!termino) return usuarios;
    
    const terminoMin = termino.toLowerCase();
    
    return usuarios.filter(user => 
        user["Nombre Completo"].toLowerCase().includes(terminoMin) || 
        user["Usuario"].toLowerCase().includes(terminoMin)
    );
}

// Exportamos la función para que Jest pueda leerla
module.exports = { filtrarUsuarios };