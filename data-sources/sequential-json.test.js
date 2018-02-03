import test from 'ava'
import SequentialJsonDataSource from './sequential-json.js'

const zeroTweets = {
  tweets: []
}

const oneTweet = {
  tweets: [
    {
      url: 'https://twitter.com/scriptnull/1'
    }
  ]
}

const nTweets = {
  tweets: [
    {
      url: 'https://twitter.com/scriptnull/1'
    },
    {
      url: 'https://twitter.com/scriptnull/2'
    },
    {
      url: 'https://twitter.com/scriptnull/3'
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
