import _ from 'underscore'

export default class SequentialJsonDataSource {
  constructor (tweets, { storage, circular }) {
    if (!_.isArray(tweets)) {
      throw new TypeError('Expecting tweets to be an array')
    }
    if (_.isEmpty(tweets)) {
      throw new Error('Expecting tweets to have atleast 1 tweet')
    }
    this.tweets = tweets
    this.minIndex = 0
    this.maxIndex = tweets.length - 1

    this.storage = storage

    // iterates tweets in a circular manner
    this.circular = false

    if (_.isBoolean(circular)) {
      this.circular = true
    }

    // use getters and setter to access this.dataIndex at all places
    this.dataIndex = 0

    let seed = 0

    if (this.storage) {
      let tweetIndexLastAt = parseInt(this.storage.getItem('tweetIndexLastAt'))
      if (_.isFinite(tweetIndexLastAt)) {
        seed = tweetIndexLastAt + 1
      }
    }

    this.setIndex(seed)
  }

  setIndex (index) {
    if (!this.hasTweet(index)) {
      throw new Error('Out of Range Exception')
    }

    this.dataIndex = index
    if (this.storage) {
      this.storage.setItem('tweetIndexLastAt', this.getIndex())
    }
  }

  getIndex () {
    return this.dataIndex
  }

  hasTweet (index) {
    return (index >= this.minIndex) && (index <= this.maxIndex)
  }

  nowAt () {
    return this.getIndex() + 1
  }

  total () {
    return this.tweets.length
  }

  current () {
    return this.tweets[this.getIndex()]
  }

  previous () {
    let prevIndex = this.getIndex() - 1

    if (!this.hasTweet(prevIndex)) {
      if (!this.circular) {
        throw new Error('Out Of Bounds Exception')
      }

      this.setIndex(this.maxIndex)
      return this.current()
    }

    this.setIndex(prevIndex)
    return this.current()
  }

  next () {
    let nextIndex = this.getIndex() + 1

    if (!this.hasTweet(nextIndex)) {
      if (!this.circular) {
        throw new Error('Out Of Bounds Exception')
      }

      this.setIndex(this.minIndex)
      return this.current()
    }

    this.setIndex(nextIndex)
    return this.current()
  }

  reset () {
    this.setIndex(0)
  }
}
