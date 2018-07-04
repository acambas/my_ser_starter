import request from 'supertest'
import puppeteer from 'puppeteer'
import app from '../server'
import mockDataFetch from '../server/HttpApis/testApi/mockDataFetch'
import { delay } from '../utils/awaiting'
import { closeServer, startServer } from './utils/server'

jest.mock('../server/HttpApis/testApi/mockDataFetch')

test('test /api/test endpoint', async () => {
  mockDataFetch.mockReturnValueOnce(Promise.resolve({ sasa: 'sasa' }))
  const response = await request(app).get('/api/test')
  expect(response.body).toEqual({ sasa: 'sasa' })
})

let server = null

beforeAll(async () => {
  server = await startServer(app, 3000)
  await delay(500)
})
afterAll(async () => {
  await closeServer(server)
})

test(
  'test loading ajax page',
  async () => {
    mockDataFetch.mockReturnValueOnce(Promise.resolve({ sasa: 'sasa' }))
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://localhost:3000/ajax', { waitUntil: 'networkidle0' })
    const innerText = await page.$eval('#ajax', el => el.textContent)
    expect(innerText).toEqual('{"sasa":"sasa"}')
    await browser.close()
  },
  5000,
)
