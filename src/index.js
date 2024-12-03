const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());

// Rota para SSE
app.get("/events", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
  
    // Envia mensagens de horário a cada segundo
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      res.write(`data: ${currentTime}\n\n`);
    }, 1000);
  
    req.on("close", () => {
      clearInterval(interval);
      console.log("Cliente desconectado.");
    });
  });
  

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
