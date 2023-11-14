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


// Inicia el servidor
app.listen(PORT,() => console.log(`Server listening on port ${PORT}`));
