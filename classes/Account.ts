import * as Crypto from '@waves/ts-lib-crypto'

class Account {
  seed: string

  constructor (seed: string) {
    this.seed = seed
  }

  get address () {
    return Crypto.address(this.seed, 'T')
  }

  get publicKey () {
    return Crypto.publicKey(this.seed)
  }

  get privateKey () {
    return Crypto.privateKey(this.seed)
  }
}

export default Account

