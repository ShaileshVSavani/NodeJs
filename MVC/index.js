const express = require("express");
const dbConnection = require("./config/db");
require("dotenv").config();

const ProductRoutes = require("./router/productRoutes");
const app = express();
app.use(express.json());

const Port = process.env.PORT || 8090




app.use("/product", ProductRoutes);

app.listen(Port, () => {
  console.log(`listening on http://localhost: ${Port}`);
  dbConnection();
});




// const express = require("express");
// const dbConnection = require("./config/db");
// const ProductRoutes = require("./router/productRoutes");
// require("dotenv").config();

// const app = express();

// // Middleware
// app.use(express.json());

// // Routes
// app.use("/product", ProductRoutes);

// // Port
// const Port = process.env.PORT || 8090;

// // Start Server
// const startServer = async () => {
//   try {
//     await dbConnection();
//     app.listen(Port, () => {
//       console.log(`Listening on http://localhost:${Port}`);
//     });
//   } catch (error) {
//     console.error("Failed to start server:", error.message);
//   }
// };

// startServer();
