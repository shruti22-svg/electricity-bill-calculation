const express = require("express");
const path = require("path");
const { calculateBill } = require("./bill");

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/calculate", (req, res) => {
  try {
    const units = req.body.units;
    const bill = calculateBill(units);
    res.json(bill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Electricity bill app running on port ${PORT}`);
});
