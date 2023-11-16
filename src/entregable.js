import express, { response } from 'express';
import ProductManager from './ProductManager.js';
const PORT = 8080;
const app = express();

const jsonFileName = './ProductManager.js';
const productManager = new ProductManager('./src/productos.json');

//* Inicializamos la instancia y cargimport express from 'express';
import ProductManager from './ProductManager.js';

const PORT = 8080;
const app = express();

const jsonFileName = './src/productos.json';
const productManager = new ProductManager(jsonFileName);


    //? Middleware para parsear el cuerpo de las peticiones como JSON-
    app.use(express.json());
    //? Endpoint para obtener los productos.
    app.get('/products', async (req, res) => {
        try{
            const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
            const products = await productManager.getProducts(limit);
            console.log(`Productos obtenidos `, products);
            res.json({ products })
        }catch(error){
            console.error('Error al procesar la solicitud.', error);
            res.status(500).send({error: 'Error interno del servidor'})
        }
    });
    
    //? Endopoint para obtener un porducto por ID
    app.get('/products/:id', async(req,res)=> {
        try{
            const productId = parseInt(req.params.id);
            const porduct = await productManager.getProductsById(productId);
            if(!porduct){
                res.status(404).send({error: 'Producto no encontrado'});
                return;
            }
            res.json({porduct})
        }catch(error){
            console.log('Error al procesar la solicitud:', error);
            resp.status(500).send({error: 'Error interno del serivodr'})
        }
    })
    
    // //* Inicializamos la instancia y carga de los datos existentes
    productManager.init().then(() => {
        console.log('Product Manager Inicializado correctamente');

        productManager.addProduct('Producto 1', 'Descripción 1', 100, 'imagen1.jpg', 'code1', 10);
        productManager.addProduct('Producto 2', 'Descripción 2', 150, 'imagen2.jpg', 'code2', 15);
        productManager.addProduct('Producto 3', 'Descripción 3', 200, 'imagen3.jpg', 'code3', 20);
        productManager.addProduct('Producto 4', 'Descripción 4', 250, 'imagen4.jpg', 'code4', 25);
        productManager.addProduct('Producto 5', 'Descripción 5', 300, 'imagen5.jpg', 'code5', 30);
        productManager.addProduct('Producto 6', 'Descripción 6', 350, 'imagen6.jpg', 'code6', 35);
        productManager.addProduct('Producto 7', 'Descripción 7', 400, 'imagen7.jpg', 'code7', 40);
        productManager.addProduct('Producto 8', 'Descripción 8', 450, 'imagen8.jpg', 'code8', 45);
        productManager.addProduct('Producto 9', 'Descripción 9', 500, 'imagen9.jpg', 'code9', 50);
        productManager.addProduct('Producto 10', 'Descripción 10', 550, 'imagen10.jpg', 'code10', 55);

    //? Verificando que los productos se carguen correctamente
    productManager.getProducts().then((products) => {
            console.log('Productos cargados:', products);
        }).catch((error) => {
            console.error('Error al obtener productos:', error);
    });

    

    //? Iniciando el servidor después de cargar los datos
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });

}).catch((error) => {
    console.error('Error al inicializar ProductManager:', error);
});

