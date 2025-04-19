import { Hono } from "hono";
import { handle } from "hono/vercel";
import { serve } from "@hono/node-server";

const app = new Hono().basePath("/api");

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

// 添加本地开发服务器启动逻辑
const port = 5000; // 或者你想要的其他端口
if (process.env.NODE_ENV !== "production") {
	// 确保只在本地开发时运行
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
export const OPTIONS = handler;
