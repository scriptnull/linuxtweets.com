# OSS Project Checklist

A copy of the below checklist could be obtained from https://github.com/scriptnull/oss-checklist (Help us make it better!)

## Pre-checks
- [x] Able to explain your project in a tweet ?
> Linux lessons from curated tweets

- [x] Choose a name for the project
> linuxtweets.com

- [x] Check if domain name / App name is available ?
> got linuxtweets.com

- [x] List and learn tools required for the project
> Reactjs

- [x] Prepare mock-up and one page design document, if needed to explain to collaborators
> Logo at top, tweet at center, subtle message at the bottom. That's it

- [x] List previous / similar implementations and learn from them
> Couldn't find any

- [x] Start a blog post to document the journey ( if time permits ) Mention idea + helpful resources.
> Not documenting

- [x] Ask if project could be solved in a modular way by dividing into sub-problems and creating a separate project for the sub-problems.
> One modular thing that could be done is separate out the react component that renders the tweets
> It's already there => https://github.com/capaj/react-tweet-embed

## Project Creation
- [x] Create a Repository in any of the Source Control Management sites
    - Github ( Free public repos )
    - Gitlab ( Free public and private repos + CI  + docker registry )
    - Bitbucket ( Free public and private repos )
> https://github.com/scriptnull/linuxtweets.com

- [ ] Create a README.md (check below for more)
- [ ] Create a LICENSE file (choose one before)
- [ ] Create a CODE_OF_CONDUCT.md
- [ ] Create a CONTRIBUTING.md
- [x] Create a .gitignore
- [ ] Create [Gitter](https://gitter.im) chatroom (if needed)

## README.md Checklist
- [x] Title
- [x] Logo
- [ ] Badges
- [ ] Description
- [ ] Prerequisite for using software ( if any )
- [ ] Install
- [ ] Example Usage
- [ ] Screenshots and GIFs
    - For command line apps, try [asciinema](https://asciinema.org/)
    - For mac GUI screenshots, use [Cmd+Shift+3] or [Cmd+Shift+4] or [Cmd+Shift+4,SpaceBar]
    - For mac GUI GIF creation, try [kap](https://getkap.co/)
    - For Ubuntu GUI Screenshots, use [Shift+PrintScr] or [Shutter](http://shutter-project.org/)
    - For Ubuntu GUI GIF creation, try [silentcast](https://github.com/colinkeenan/silentcast)
- [ ] Benchmarks
- [ ] Contributors
- [ ] Backers and Sponsors
- [ ] Attributions ( mention 3rd party libs used etc. )
- [ ] Security
    - [ ] Post maintainer's PGP fingerprint for reporting security vulnerabilities
    - [ ] Share [keybase](https://keybase.io/) profile for making the reporting process easier.

## Coding Phase
- [ ] Install required developer tools
    - Compiler
    - Linter
    - Formatter
    - Build Tool
    - Other
- [ ] Basic code complete
- [ ] Write tests and keep watch on code coverage
- [ ] Setup CI
    - [AppVeyor](https://www.appveyor.com/) - CI/CD for Windows developers.
    - [CircleCI](https://circleci.com/) - Docker-based building with support of customized workflows.
    - [Codefresh](https://codefresh.io/) - Docker-native CI/CD.
    - [Codeship](https://codeship.com/) - Continuous integration, delivery, and deployment.
    - [continuousphp](https://continuousphp.com/) - CI/CD for PHP applications.
    - [DeployHQ](https://www.deployhq.com/) - Deployment automation.
    - [Sauce Labs](https://saucelabs.com/) - Cross-browser testing, Selenium testing, and mobile testing.
    - [Semaphore](https://semaphoreci.com/) - Fast automated CI/CD.
    - [Shippable](https://www.shippable.com/) - DevOps automation.
    - [Travis-CI](https://travis-ci.org/) - Automated CI/CD for Open Source.
- [ ] Host the documentation of the code somewhere if the project is a software library
- [ ] Use Github issues ( or other tools ) for tracking backlogs
- [ ] Encourage OSS culture by having labels like "help wanted" "easy-to-contribute" etc.
- [ ] Contribute to other OSS projects on which the current project is dependent on ( if possible )
    - File bug reports
    - Improve docs
    - Suggest feature
    - Learn by reading code

## Release Phase
- [ ] Package software in CI or manually in local
- [ ] Publish in registries (npm, docker hub etc.) or markets (Android store, App Store etc.)
- [ ] Create the release version, description, link for downloading the release etc. in release page ( example: Github release page)

## Post-release
- [ ] Publish the blog post
- [ ] [Tweet](https://twitter.com/)
- [ ] [Hackernews](https://news.ycombinator.com/)
- [ ] [Product Hunt](http://producthunt.com/)
- [ ] Send PR to `awesome-*` github repository
- [ ] [Reddit](https://www.reddit.com)
- [ ] [Hashnode](https://hashnode.com/)
- [ ] [Linkedin](https://www.linkedin.com/)
- [ ] Edit Wikipedia pages (if related)
- [ ] Prepare slides and give talks (if possible)
