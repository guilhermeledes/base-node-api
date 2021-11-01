import bcrypt from 'bcrypt'
import { HashComparer } from '../../data/protocols/criptography/hash-comparer'
import { Hasher } from '../../data/protocols/criptography/hasher'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {
  }

  async compare (plainValue: string, hashedValue: string): Promise<boolean> {
    const isValid = await bcrypt.compare(plainValue, hashedValue)
    return isValid
  }

  async hash (value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, this.salt)
    return hashedValue
  }
}
