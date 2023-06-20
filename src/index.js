import express from "express";
import handlebars from "express-handlebars";
import productRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";
import ProductManager from "./controllers/ProductManager.js";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 8080;
const product = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

 app.use("/api/products", productRouter)
app.use("/api/cart", CartRouter)

app.get("/home", async (req, res) => {
  let allproducts = await product.getProducts();
  res.render("home", {
    products: allproducts,
  });
});

app.get("/realTimeProducts", async (req, res) => {
  let allproducts = await product.getProducts();
  res.render("realTimeProducts", {
    products: allproducts,
  });
});

const serverHttp = app.listen(port, () => {
  console.log(`servidor ON ${port}`);
});
const io = new Server(serverHttp);

io.on("connection", () => {
  console.log("se realizo una conexion");
});
