---
layout: single
title:  "Ventures into HTTP"
date:   2015-03-18
categories: blog
---
At the moment I'm working on <a href="/project/crawlr" target="_blank">a side project</a> that was recently rendered completely redundant by my co-worker pointing out that Google is a thing.

Nevertheless I plan on seeing it through to completion because I'm very curious about web scraping, and I want to learn more about HTTP, the nature of the internet, and regular expressions.

I've therefore been doing a fair bit of reading about HTTP status codes, response types, and so on. I was rather surprised to find that the things servers respond with aren't always in a consistent format.

My guess is this has to do with servers being independently operated, with so many varieties of possible software stacks and configurations. Any computer can technically act as a server.

Kind of a bummer for the client though.

To put it another way, every time my computer asks the internet for something, the internet returns something, but the way that something is described is kind of vague.

<a href="https://github.com/saricden/crawlr/commit/a995ce99332cffe8d66da0becb403b1d8fc2f11c?diff=unified#diff-2073e06926cc25d60c62712e3f9c798eR97" target="_blank">This is an example of what I'm on about.</a>

Note the use of <em>strpos</em> to match 'html' anywhere in the string.

My original plan was to just check if the content type was equal to 'text/html', but after a bit of testing I quickly discovered that a response can be described as HTML by a variety of different strings.

Anyways, I'll conclude my rambling there. I'm beginning to feel a bit like <a href="http://en.wikipedia.org/wiki/James_May" target="_blank">James May</a>.

Peace out homies!