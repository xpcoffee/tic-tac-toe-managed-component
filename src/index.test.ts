import crypto from 'crypto'

beforeAll(() => {
  vi.stubGlobal('crypto', crypto)
})

describe('tic-tac-toe-managed-component', () => {
  it('example test', () => {
    expect(true).toEqual(true)
  })
})
