import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

// Serve the SPA for client-side routes
app.get("/comms-team", (c) => c.env.ASSETS.fetch(new Request(new URL("/", c.req.url))));

export default app;
