# EconEdLink Scraper

[EconEdLink][] is a site full of awesome economics and personal finance lessons. Those lessons are aligned to national standards though a little bit of black magic on the back end. Each lesson is tagged with concepts. Those concepts are weighted and crunched. Standards come out the other end. It's years and years of PHP piled on top of PHP. Rather than reverse engineer the whole process, it's simpler to just scrape the pages (which are impecably marked up).

## Requirements

Let's be perfectly honest. This was built for my personal use. That said, there may some parts that are useful, so I made it open source—mostly, because I wanted to leverage the full awesomeness of Github.

You will need:

* A [CouchDB][] server running at `localhost:5984`
* A [Noodle.js][] process running at `localhost:8888`

These are the defaults for each of these.

## To Do

* Fix the streams
  * Right now, there is an [potential bug in Node][nodebug] that causes long-running HTTP requests to outlive the process. As a quick fix, I just never end the readable stream. The end result, is that it will keep looping. I should probably try to either figure out a work around or trying this out on a patched version of Node.
  * The Writable stream was being a bit funky, so I just did my CouchDB requests from an event handler at the end of my stream pipe. This works, but it makes me feel dirty, so I should probably fix it.
* Reduce the dependencies
  * CouchDB is a pretty minor dependency, but the ultimate goal is to push stuff to Couch—so, I'm okay with that.
  * I would like to elimimate the need to have Noodle.js launched prior to running the scraper. Even if this tool just launches Noodle.js as a child process—that's fine with me. As it stands, all you get are some fairly unhelpful errors if Noodle.js is not running. Not cool.
  * Alternatively, I could switch to using Cheerio or something, but that's unlikely to ever happen because this pretty much works and I have other things to do.
* Write more tests
  * The parsers and scapers have tests, but the streams do not. This is partly because I was burning out towards the end and partly because if the scrapers and parsers worked, the streams either mostly worked or threw a helpful fatal error.

## Environment Variables

You'll need some environment variables to get this bad boy up and running. They're MySQL credentials. I'll leave it as an exercise to the reader to figure out what they are.

* `EEL_DB_ADDRESS`
* `EEL_DB_USERNAME`
* `EEL_DB_PASSWORD`
* `EEL_DB_DATABASE`

[EconEdLink]: http://econedlink.org/ "EconEdLink"
[CouchDB]: http://couchdb.apache.org
[Noodle.js]: http://noodlejs.com
[nodebug]: https://github.com/joyent/node/issues/5439