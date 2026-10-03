// filtros.test.js
const { filtrarUsuarios } = require('./filtros');

describe('Pruebas unitarias de la función filtrarUsuarios', () => {
    
    // Datos de prueba (Mocks) simulando la API de JSONPlaceholder
    const mockUsuarios = [
        { "Nombre Completo": "Leanne Graham", "Usuario": "Bret" },
        { "Nombre Completo": "Ervin Howell", "Usuario": "Antonette" },
        { "Nombre Completo": "Clementine Bauch", "Usuario": "Samantha" }
    ];

    test('Debe encontrar un usuario por su Nombre Completo', () => {
        const resultado = filtrarUsuarios(mockUsuarios, 'leanne');
        expect(resultado).toHaveLength(1);
        expect(resultado[0].Usuario).toBe('Bret');
    });

    test('Debe encontrar un usuario por su alias de Usuario', () => {
        const resultado = filtrarUsuarios(mockUsuarios, 'antonette');
        expect(resultado).toHaveLength(1);
        expect(resultado[0]["Nombre Completo"]).toBe('Ervin Howell');
    });

    test('Debe devolver todos los usuarios si el término está vacío', () => {
        const resultado = filtrarUsuarios(mockUsuarios, '');
        expect(resultado).toHaveLength(3);
    });

    test('Debe devolver un arreglo vacío si no hay coincidencias', () => {
        const resultado = filtrarUsuarios(mockUsuarios, 'pedrito');
        expect(resultado).toHaveLength(0);
    });
});