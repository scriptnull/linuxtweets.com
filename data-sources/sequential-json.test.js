import test from 'ava'
import SequentialJsonDataSource from './sequential-json.js'

const twitterStatusBaseUrl = 'https://twitter.com/scriptnull/status'

const zeroTweets = {
  tweets: []
}

const oneTweet = {
  tweets: [
    {
      url: twitterStatusBaseUrl + '/1'
    }
  ]
}

const nTweets = {
  tweets: [
    {
      url: twitterStatusBaseUrl + '/1'
    },
    {
      url: twitterStatusBaseUrl + '/2'
    },
    {
      url: twitterStatusBaseUrl + '/3'
    }
  ]
}

test('should throw error for non-array tweets', t => {
  let wrongTweets = [
    '',
    1,
    {},
    null,
    undefined
  ]

  for (let tweet of wrongTweets) {
    const error = (t.throws(() => {
      new SequentialJsonDataSource(tweet, {circular: true})
    }, TypeError))

    t.is(error.message, 'Expecting tweets to be an array')
  }
})

test('should throw error for 0 tweets', t => {
  const error = (t.throws(() => {
    new SequentialJsonDataSource(zeroTweets.tweets, {circular: true})
  }, Error))

  t.is(error.message, 'Expecting tweets to have atleast 1 tweet')
})

test('should init for 1 tweet', t => {
  let ds = new SequentialJsonDataSource(oneTweet.tweets, {circular: true})
  t.truthy(ds, 'ds should be a truthy value')
})

test('should init for n tweets', t => {
  let ds = new SequentialJsonDataSource(nTweets.tweets, {circular: true})
  t.truthy(ds, 'ds should be a truthy value')
})

test('should cycle forward for n tweets', t => {
  let ds = new SequentialJsonDataSource(nTweets.tweets, {circular: true})

  for (let i = 1; i <= 111; i++) {
    let nextTweet = ds.next()
    t.truthy(nextTweet)

    let expected = (i % nTweets.tweets.length) + 1
    t.is(ds.nowAt(), expected)

    t.is(nextTweet.url, twitterStatusBaseUrl + '/' + expected)
  }
})

test('should cycle backward for n tweets', t => {
  let ds = new SequentialJsonDataSource(nTweets.tweets, {circular: true})

  for (let i = 1; i <= 111; i++) {
    let previousTweet = ds.previous()
    t.truthy(previousTweet)

    let expected = nTweets.tweets.length - ((i - 1) % nTweets.tweets.length)
    t.is(ds.nowAt(), expected)

    t.is(previousTweet.url, twitterStatusBaseUrl + '/' + expected)
  }
})
