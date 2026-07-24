import express from 'express'
import errorHandler from './common/middleware/errorHandler.js'
const app = express()

app.use(express.json())

app.use(errorHandler)
export default app