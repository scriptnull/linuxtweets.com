First of all, _Thanks_ for your interest in contributing to the project :metal:

### Contributing Tweets
linuxtweets.com is aims to be a hand picked collection of tweets that teach or intrigue to learn something about linux.

If you wish to add new tweets,
1. Open a PR by editing [the tweets.json file](https://github.com/scriptnull/linuxtweets.com/blob/master/tweets.json).
1. Make sure to add your tweets at the last.
1. Tweets can be either from you or others.
1. Tweets should stay in context with linux.

### Contributing Feedback
Would love to get some feedback on the project. Feel free to [open an issue](https://github.com/scriptnull/linuxtweets.com/issues/new) and provide feedback.

Feedback on following would be helpful.
- What is good?
- What could be improved?
- Did something go wrong?
- What do you like to see in upcoming releases?

### Contributing Code
linuxtweets.com is a static site and it uses a [number of technologies](https://github.com/scriptnull/linuxtweets.com#attributions) to stay live.

I hope that you enjoy playing around with those technologies while contributing.

#### Development workflow
Prerequisite: [Node.js and npm](https://nodejs.org/en/)

```bash
# Download Source Code
git clone git@github.com:scriptnull/linuxtweets.com.git
cd linuxtweets.com

# Download supporting libraries
npm install

# Start watch server
npm run parcel

# Write code

# Test code
npm test

# Push code to your fork
git add .
git commit -m "descriptive message"
git push your master

# Open a pull request

# Merged
```

#### Release
The release process looks like

```bash
# package the final artifact that is deployed to linuxtweets.com
npm run production

# commit the artifacts in docs folder
git add docs
git commit -m "packages artifact"

# Increment version number in package.json
npm version <major|minor|patch>

# push and tag release in github
```

It is optional to do `npm run production` and `npm version` before sending the PR. If you miss, a maintainer would group the changes and release multiple things at a time.

But, we will strive to keep running the site on bleeding edge. :fork_and_knife:





