import { Router, Request, Response } from "express";

const router = Router();

const clients: Response[] = [];

router.get("/events", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    clients.push(res);

    req.on("close", () => {
        const index = clients.indexOf(res);
        if (index !== -1) clients.splice(index, 1);
    });
});

export const broadcastEvent = (data: unknown) => {
    const payload = `data: ${JSON.stringify(data)}\n\n`;
    clients.forEach((client: Response) => client.write(payload));
};

export default router;