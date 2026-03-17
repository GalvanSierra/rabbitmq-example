import express, { Express, Request, Response } from 'express';

const app: Express = express();
app.use(express.json());

app.post('/track', (req: Request, res: Response) => {
    console.log('[Analytics Service] Track request:', req.body);
    res.json({ success: true, message: 'Evento registrado' });
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Analytics Service running on port ${PORT}`);
});
