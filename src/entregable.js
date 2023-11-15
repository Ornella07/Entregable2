import express from "express";
const ProductManager = "./ProductManager.js";

const PORT = 8080; 
const app = express();


// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(express.json());

//ruta para obtener todos los productos con opcion limit
app.get('/products', async(req,res) => {
    try{
        const limit =  req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await productManager.getProducts(limit);
        console.log('Obtained Products: ', products);
        res.json({products})
    }catch(error){
        console.error('Error processing request.', error);
        res.status(500).send('Internal Server Error.')
    }
});

// Ruta para obtener productos por ID

app.get('/products/:id', async(req,res) => {
    try{
        const prodId = req.params.id;
        const productManager = new ProductManager(path.json('productos.json'));
        const product = await productManager.getProductsById(prodId);
        if(product){
            res.json(product)
        }else{
            res.status(404).send('Product Not Found')
        }
    }catch (error){
        console.error('Error getting product by ID:' , error);
        res.status(500).send('Internal Server Error')
    }
});


// // Inicia el servidor
// app.listen(PORT,() => console.log(`Server listening on port ${PORT}`));
// Agregando productos
ProductManager.addProduct('Producto 1', 'Descripción 1', 100, 'imagen1.jpg', 'code1', 10);
ProductManager.addProduct('Producto 2', 'Descripción 2', 150, 'imagen2.jpg', 'code2', 15);
ProductManager.addProduct('Producto 3', 'Descripción 3', 200, 'imagen3.jpg', 'code3', 20);
ProductManager.addProduct('Producto 4', 'Descripción 4', 250, 'imagen4.jpg', 'code4', 25);
ProductManager.addProduct('Producto 5', 'Descripción 5', 300, 'imagen5.jpg', 'code5', 30);
ProductManager.addProduct('Producto 6', 'Descripción 6', 350, 'imagen6.jpg', 'code6', 35);
ProductManager.addProduct('Producto 7', 'Descripción 7', 400, 'imagen7.jpg', 'code7', 40);
ProductManager.addProduct('Producto 8', 'Descripción 8', 450, 'imagen8.jpg', 'code8', 45);
ProductManager.addProduct('Producto 9', 'Descripción 9', 500, 'imagen9.jpg', 'code9', 50);
ProductManager.addProduct('Producto 10', 'Descripción 10', 550, 'imagen10.jpg', 'code10', 55);


// Verificando que los productos se carguen correctamente
ProductManager.getProducts().then((products) => {
        console.log('Productos cargados:', products);
    }).catch((error) => {
        console.error('Error al obtener productos:', error);
});


 // Iniciando el servidor después de cargar los datos
 app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

