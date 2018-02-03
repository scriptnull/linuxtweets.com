export default class SequentialJsonDataSource {
  constructor (tweets) {
    this.dataIndex = 0
    this.tweets = tweets
  }

  hasPrevious () {
    return this.dataIndex > 0
  }

  hasNext () {
    return this.dataIndex < this.tweets.length - 1
  }

  previous () {
    if (!this.hasPrevious()) {
      return null
    }

    return this.tweets[--this.dataIndex]
  }

  next () {
    if (!this.hasNext) {
      return null
    }

    return this.tweets[++this.dataIndex]
  }
}
