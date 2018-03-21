import mockDataFetch from '../mockDataFetch'

test('mock server test', async () => {
  const res = await mockDataFetch()
  expect(res).toEqual({ value: 'ok' })
})
