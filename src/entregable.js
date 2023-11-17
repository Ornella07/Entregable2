import express from 'express';
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

