const express = require("express");
const app = express();
const kendaraan = require("./routes/kendaraan.route");
const retribusi = require("./routes/retribusi.route");
require("dotenv").config();

const port = process.env.PORT_SERVER;

app.use(express.json());
app.use("/api/v1/kendaraan", kendaraan);
app.use("/api/v1/retribusi", retribusi);

app.listen(port);
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}.`);
// });
