import express from "express";
import productRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/products", productRouter)
app.use("/api/cart", CartRouter)

app.listen(port,()=>{
    console.log(`servidor ON ${port}`)
})  