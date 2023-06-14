import express from "express";
import handlebars from "express-handlebars"
import productRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";
import ProductManager from "./controllers/ProductManager.js";

const app = express();
const port = 8080;
const product = new ProductManager();

app.engine('handlebars', handlebars.engine())
app.set('views','./src/views')
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/products", productRouter)
app.use("/api/cart", CartRouter)

app.get('/home', async (req,res)=>{
    let allproducts = await product.getProducts()
    res.render('home',{
        products : allproducts
    })
})

app.listen(port,()=>{
    console.log(`servidor ON ${port}`)
})  