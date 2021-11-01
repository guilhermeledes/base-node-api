import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise<string>(resolve => resolve('hash'))
  },
  async compare (): Promise<boolean> {
    return await new Promise<boolean>(resolve => resolve(true))
  }
}))

interface SutTypes {
  sut: BcryptAdapter
  salt: number
}

const makeSut = (): SutTypes => {
  const salt = 12
  const sut = new BcryptAdapter(salt)
  return { sut, salt }
}

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct value', async () => {
    const { sut, salt } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a valid hash on hash success', async () => {
    const { sut } = makeSut()
    const hashedValue = await sut.hash('any_value')
    expect(hashedValue).toBe('hash')
  })

  test('Should throw if hash throws', async () => {
    const { sut } = makeSut()
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(Promise.reject(new Error()) as unknown as void)
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })

  test('Should call compare with correct value', async () => {
    const { sut } = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  test('Should return true if compare succeeds', async () => {
    const { sut } = makeSut()
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(true)
  })

  test('Should return false if compare fails', async () => {
    const { sut } = makeSut()
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.resolve(false) as unknown as void)
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(false)
  })
})
