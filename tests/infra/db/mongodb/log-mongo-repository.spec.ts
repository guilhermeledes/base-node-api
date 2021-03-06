import { LogMongoRepository, MongoHelper } from '@/infra/db'
import { Collection } from 'mongodb'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('Log Mongo Repostitory', () => {
  let errerCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errerCollection = MongoHelper.getCollection('errors')
    await errerCollection.deleteMany({})
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    const count = await errerCollection.countDocuments()
    expect(count).toBe(1)
  })
})
