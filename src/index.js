import express from "express";
import handlebars from "express-handlebars"
import productRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";
import product from './router/product.routes.js'

const app = express();
const port = 8080;

app.engine('handlebars', handlebars.engine())
app.set('views','./src/views')
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/products", productRouter)
app.use("/api/cart", CartRouter)

app.get('/home', (req,res)=>{
    res.render('home')
})

app.listen(port,()=>{
    console.log(`servidor ON ${port}`)
})  