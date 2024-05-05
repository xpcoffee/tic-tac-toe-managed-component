import crypto from 'crypto'

beforeAll(() => {
    vi.stubGlobal('crypto', crypto)
})

// No tests here so far; testing mainly done in the worker
// TODO component tests for the UX
// TODO test the manual proxy for opponentMove
describe('tic-tac-toe-managed-component', () => {
    it('example test', () => {
        expect(true).toEqual(true)
    })
})
