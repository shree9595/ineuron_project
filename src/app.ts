import * as dotenv from "dotenv";
dotenv.config();
import express, { ErrorRequestHandler } from "express";
import { Request, Response, NextFunction } from "express";
const app = express();
import bodyParser from "body-parser";
import createHttpError from "http-errors";
import connectWithDb from './config/connectWithDb'
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Import  All routes 
import UserRoute from "./routes/userRoute";

const PORT = process.env.PORT || 5000;

// DB Connection
connectWithDb();

// common middleware
app.use(bodyParser.json());


//user route
app.use("/api", UserRoute);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello Ineuron")
})

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound())
})

// error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message,
    })
}

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Application started on ${PORT}...`);
});

export default app;
