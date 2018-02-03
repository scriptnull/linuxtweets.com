import _ from 'underscore'

export default class SequentialJsonDataSource {
  constructor (tweets, { storage, circular }) {
    if (!_.isArray(tweets)) {
      throw new Error('Expecting tweets to be an array')
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

    let tweetIndexLastAt = parseInt(window.localStorage.getItem('tweetIndexLastAt'))

    let seed = _.isFinite(tweetIndexLastAt) ? tweetIndexLastAt + 1 : 0

    this.setIndex(seed)
  }

  setIndex (index) {
    if (this.hasTweet(index)) {
      this.dataIndex = index
      if (this.storage) {
        this.storage.setItem('tweetIndexLastAt', this.getIndex())
      }
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
        // may be throw exception
        return null
      }

      this.setIndex(this.maxIndex)
    }

    this.setIndex(prevIndex)

    return this.tweets[this.getIndex()]
  }

  next () {
    let nextIndex = this.getIndex() + 1

    if (!this.hasTweet(nextIndex)) {
      if (!this.circular) {
        // may be throw exception
        return null
      }

      this.setIndex(this.minIndex)
    }

    this.setIndex(nextIndex)

    return this.tweets[this.getIndex()]
  }

  reset () {
    this.setIndex(0)
  }
}
