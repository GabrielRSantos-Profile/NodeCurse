import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = 3000;

//Middleware para JSON
app.use(express.json());
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log('Servidor rodando em http://localhost:${PORT}');
});
