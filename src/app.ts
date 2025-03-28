import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';
import router from './routes';
import { Morgan } from './shared/morgen';
import handleStripeWebhook from './webhook/handleStripeWebhook';
const app = express();

//morgan

app.post('/api/v1/stripe/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);
app.use(
      cors({
            origin: ['http://10.0.70.128:3004', 'http://localhost:3000', 'http://10.0.70.128:3002'],
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            optionsSuccessStatus: 200,
      })
);

app.use(Morgan.successHandler);
app.use(Morgan.errorHandler);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('uploads'));

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
      res.send(`
            <div style="display:flex; justify-content:center; align-items:center; height:100vh;">
                  <div style="text-align:center;">
                        <h1 style="color:#A55FEF; font-family:Arial, Helvetica, sans-serif; font-size:3rem;">Welcome to my API</h1>
                        <p style="color:#777; font-size:1.5rem;">I'm happy to help you with anything you need.</p>
                  </div>
            </div>
      `);
});

//global error handle
app.use(globalErrorHandler);

//handle not found route;
app.use((req, res) => {
      res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: 'Not found',
            errorMessages: [
                  {
                        path: req.originalUrl,
                        message: `The API route ${req.originalUrl} doesn't exist. Please contact the API owner if you need help`,
                  },
            ],
      });
});

export default app;
