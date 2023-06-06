import express from "express";
import ProductManager from "./controllers/ProductManager.js";

const product = new ProductManager();

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/products", async (req,res)=>{
   res.send(await product.getProducts())
})

app.post("/products", async (req,res)=>{
    let newProduct = req.body
    res.send(await product.addProducts(newProduct))
})

app.listen(port,()=>{
    console.log(`servidor ON ${port}`)
})