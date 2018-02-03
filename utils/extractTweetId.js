export default (tweet) => {
  let urlParts = tweet.url.split('/')
  let id = urlParts[urlParts.length - 1]
  return id
}
