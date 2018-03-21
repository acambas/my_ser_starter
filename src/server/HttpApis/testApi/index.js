import { Router } from 'express'
import mockDataFetch from './mockDataFetch'

const app = Router()
app.get('/', async (req, res) => {
  const result = await mockDataFetch()
  res.json(result)
})
export default app
