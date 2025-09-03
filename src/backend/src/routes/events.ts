import { Router, Request, Response } from "express";

const router = Router();

const clients: Response[] = [];

router.get("/events", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Cache-Control");
    res.flushHeaders();

    // Отправляем начальное сообщение для проверки соединения
    res.write(`data: ${JSON.stringify({ type: 'connected', message: 'SSE connection established' })}\n\n`);

    clients.push(res);

    req.on("close", () => {
        const index = clients.indexOf(res);
        if (index !== -1) {
            clients.splice(index, 1);
            console.log(`Client disconnected. Active clients: ${clients.length}`);
        }
    });

    req.on("error", (error) => {
        console.error('Request error:', error);
        const index = clients.indexOf(res);
        if (index !== -1) {
            clients.splice(index, 1);
        }
    });
});

export const broadcastEvent = (data: unknown) => {
    const payload = `data: ${JSON.stringify(data)}\n\n`;
    
    // Фильтруем неактивных клиентов
    const activeClients = clients.filter(client => {
        try {
            return !client.destroyed && !client.finished;
        } catch {
            return false;
        }
    });
    
    activeClients.forEach((client, index) => {
        try {
            client.write(payload);
        } catch (error) {
            console.error('Error sending event to client:', error);
            // Удаляем неактивного клиента
            clients.splice(index, 1);
        }
    });
    
    console.log(`Broadcasting event to ${activeClients.length} active clients`);
};

export default router;