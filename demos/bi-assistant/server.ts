import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      datasetLoaded: true,
      records: 10000,
      appName: "AI Business Intelligence Assistant"
    });
  });

  // AI Analysis enrichment endpoint (Server-Side Gemini Integration)
  app.post("/api/analyze", async (req, res) => {
    try {
      const { question, contextSummary } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.json({
          enriched: false,
          message: "Local deterministic analytics engine active."
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const prompt = `You are a senior C-suite Business Intelligence Analyst.
Analyze the following user business question and dataset summary context:

User Question: "${question}"
Dataset Context: ${JSON.stringify(contextSummary || {})}

Provide 3 high-impact strategic business recommendations and 2 strategic risk factors based strictly on this data. Format response as JSON with "recommendations" (array of {title, desc, priority}) and "insights" (array of strings).`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const jsonText = response.text || "{}";
      const parsed = JSON.parse(jsonText);

      return res.json({
        enriched: true,
        recommendations: parsed.recommendations || [],
        insights: parsed.insights || []
      });
    } catch (err: any) {
      console.error("Gemini API server enrichment error:", err?.message || err);
      return res.json({
        enriched: false,
        error: err?.message || "Failed to call AI model"
      });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI BI Assistant server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
