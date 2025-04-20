import { Hono } from "hono";
import { handle } from "hono/vercel";
import { serve } from "@hono/node-server";
import prisma from "../lib/prisma";

const app = new Hono().basePath("/api");

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.get("/user", async (c) => {
	try {
		const posts = await prisma.user.findMany();
		return c.json(posts);
	} catch (error) {
		console.error("Failed to fetch posts:", error);
		return c.json({ error: "Failed to fetch posts" }, 500);
	}
});

// 添加本地开发服务器启动逻辑
const port = 5000;
if (process.env.NODE_ENV !== "production") {
	console.log(`Server is running on port ${port}`);
	serve({
		fetch: app.fetch,
		port,
	});
}

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const DELETE = handler;
export const OPTIONS = handler;
