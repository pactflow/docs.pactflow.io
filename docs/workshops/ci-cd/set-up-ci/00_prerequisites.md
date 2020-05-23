---
id: prerequisites
title: Prerequisites
---

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). You need to know how to git clone, pull, push and commit.
* [Make](https://www.gnu.org/software/make/manual/make.html) - it should be installed by default on Linux/Mac. If you have Windows, install it from [sourceforge](http://gnuwin32.sourceforge.net/packages/make.htm). Note - you won't need any previous experience in using make for this workshop.
* [Node](https://nodejs.org/) 10 or thereabouts.
* [Docker](https://www.docker.com/products/docker-desktop).
* A [Github](http://github.com/) account.
* A Travis CI account that is attached to your Github account.
    1. Go to [travis-ci.com][travis-ci] and sign in with your Github account.
* A Pactflow account - ideally, your own personal one. You can sign up for a free developer account [here](https://pactflow.io/pricing/). You can use a shared company Pactflow account, but it will make things a bit fiddly, as you'll need to change the identifiers of the various resources that get created so that they don't clash with those from other workshop participants. We've found from past experience running workshops that it's much simpler if everyone has their own account.

⚠️ Note: these instructions have been written for, and tested, in a bash shell on Mac. They should work correctly on Linux. If you are using Windows, then you will need to know how to run git/make/node CLI commands, or pair with someone who does.

[travis-ci]: https://travis-ci.com