import express from "express";

const healthRouter = express.Router();

healthRouter.get('/',
    (req, res) => res.sendStatus(200)
)

healthRouter.get('/health',
    (req, res) => res.sendStatus(200)
)


export {
    healthRouter
}