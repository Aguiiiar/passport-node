import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import { config } from 'dotenv';
import cors from "cors"
import passport from 'passport';
import apiRoutes from './routes/api';

config();

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());

app.use(apiRoutes);

app.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status)
    } else {
        res.status(400);
    }

    if (err.message) {
        res.json({ error: err.message })
    } else {
        res.json({ error: 'Ocorreu algum erro.' });
    }
}
app.use(errorHandler);

app.listen(process.env.PORT);