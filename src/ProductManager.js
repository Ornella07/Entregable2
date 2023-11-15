
const fs = require('fs');

class ProductManager {
    constructor(fileName){
        this.fileName = fileName;
        if(fs.existsSync(fileName)){
            try{
                let products = fs.readFileSync(fileName, 'utf-8');
                this.products = JSON.parse(products)
            }catch(error){
                this.products = [];
            }
        }else{
            this.products = [];
            fs.writeFileSync(this.fileName, JSON.stringify(this.products), 'utf-8');
        }
    }
    getProducts(){
        return this.products;
    }
    async readFile(){
        try{
            this.products = JSON.parse(await fs.readFileSync(this.fileName, 'utf-8'))
        }
        catch(error){
            console.error(`Error ${error}`);
        }
    }
    async saveFile(){
        try{
            await fs.promises.writeFile(
                this.fileName,
                JSON.stringify(this.products,null, '\t'),'utf-8');
        }catch(error){
            console.error(`Error ${error}`);
        }

    }

    async addProducts(product){
       await this.readFile();
       const existeElCodigo = this.products.find((p) => p.code === product.code)
       if(existeElCodigo){
        console.log('Error, el codigo existe');
       }else{
        const newProduct = {...product, id:this.products.length + 1};
        this.products.push(newProduct)
        await this.saveFile();
       }
    }


    async deleteProduct(id){
        const prodSelect = this.products.find((p) => p.id == id);
        if(prodSelect){
            const newProdArr = this.products.filter((p)=> p.id != id);

            this.products = newProdArr;

            await this.saveFile();
        }else{
            console.log('Error al eliminar el producto con id');
        }
    }
    //aca se recibe el id 
    async updateProductById ({id, ...newValuesForProduct}) {
        await this.readFile();
        
  const productsForUpdate = this.products.find((p) => p.id === id);
    if (productsForUpdate !== -1) {
      this.products[productsForUpdate] = { ...this.products[productsForUpdate],newValuesForProduct };
      this.saveFile(); // Guardar los productos en el archivo después de la actualización
      return this.products[productsForUpdate];
    } else {
      console.error(`Producto con id: ${id} no encontrado`);
    }
  }
 
 

}

class Products {
    constructor(title, description, price, thumbnail, code, stock){
        (this.title = title),
        (this.description = description),
        (this.price = price),
        (this.thumbnail = thumbnail),
        (this.code = code),
        (this.stock = stock);
    }
}


// (async () => {
//     const Productos = new ProductManager('./productos.json');

//    await Productos.addProducts(new Products('Producto 1', 'Descripción 1', 100, 'imagen1.jpg', 'code1', 10))
//    await Productos.addProducts(new Products('Producto 2', 'Descripción 2', 100, 'imagen2.jpg', 'code2', 20))
//    await Productos.addProducts(new Products('Producto 3', 'Descripción 3', 100, 'imagen3.jpg', 'code3', 30))
//    await Productos.addProducts(new Products('Producto 4', 'Descripción 4', 100, 'imagen4.jpg', 'code4', 40))
//    await Productos.addProducts(new Products('Producto 5', 'Descripción 5', 100, 'imagen5.jpg', 'code5', 50))
//    await Productos.addProducts(new Products('Producto 6', 'Descripción 6', 100, 'imagen6.jpg', 'code6', 60))
//    await Productos.addProducts(new Products('Producto 7', 'Descripción 7', 100, 'imagen7.jpg', 'code7', 70))
//    await Productos.addProducts(new Products('Producto 8', 'Descripción 8', 100, 'imagen8.jpg', 'code8', 80))
//    await Productos.addProducts(new Products('Producto 9', 'Descripción 9', 100, 'imagen9.jpg', 'code9', 90))
//    await Productos.addProducts(new Products('Producto 10', 'Descripción 10', 100, 'imagen10.jpg', 'code10', 10))


//     await Productos.updateProductById ({
//         description: 'Esto esta maodifcado',
//         price: 300,
//         id:2
//       })

//     Productos.getProducts();

//     await Productos.deleteProduct(3);

//     await Productos.addProducts(new Products('Producto 1', 'Descripción 1', 100, 'imagen1.jpg', 'code1', 10));

//     await Productos.addProducts(new Products('Producto 2', 'Descripción 3', 100, 'imagen3.jpg', 'code3', 10))


//     Productos.getProducts()


// // })
// ();
module.exports = ProductManager;