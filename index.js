const express = require("express");

const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  res.json({
    message: "CI/CD Node App Running on PORT 8000 🚀"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
