import { Router } from 'express'
import testApis from './testApi'

const app = Router()
app.use('/test', testApis)

export default app
