const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyirv_wbfIoW2E3Hm3mMAeA3aROAIZ4Z5qxXWtUFViBxkH8G8j6hpmNeRFmdKoReakz/exec";

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.post("/submit", async (req, res) => {
  try {
    const googleResponse = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const data = await googleResponse.json();
    res.json(data);
  } catch (err) {
    console.error("Error forwarding to Google Script:", err);
    res.status(500).json({ success: false, error: "Proxy error" });
  }
});

app.get("/", (req, res) => {
  res.send("Render proxy is running ✅");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
