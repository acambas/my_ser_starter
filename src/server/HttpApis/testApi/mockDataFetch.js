import { delay } from '../../../utils/awaiting'

export default async () => {
  await delay(100)
  return { value: 'ok' }
}
