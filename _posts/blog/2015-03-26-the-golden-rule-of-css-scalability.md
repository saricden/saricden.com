---
layout: single
title:  "The Golden Rule of CSS Scalability"
date:   2015-03-26
categories: blog
---
On the face of it, CSS may not seem like a particularly complicated beast. Change a few font colours, position some boxes, and put some borders on stuff. Easy right?

Unfortunately not so much. Even putting aside responsiveness, good user experience, and browser compatibility there's still a lot one must consider when writing <em>good</em> CSS.

One of the most important things to keep in mind right from the get go is scalability.

What do I mean when I say scalability (in terms of CSS)?

I mean that as the project you're working on expands in size and complexity, you don't need to write loads of extra selectors and/or tack on lines upon lines of extra shit to get things looking right. At the end of the day you want your CSS to be as simple as possible, and still achieve the style you're going for.

Okay lovely, what's this golden rule already?

I think the trick is to:

<strong>Keep everything as generic/reusable as possible. Only be specific when you need to be.</strong>

This may seem obvious. If one keeps their styling as simple as possible, and only gets specific when they need to they'll end up with readable and efficient code.

Admittedly, this can be difficult to maintain in practise. It's very easy to think only of the end result, and not factor in potential (perhaps inevitable) changes, and scope additions.

A couple of things to establish before building anything: figure out consistent fonts for headings, navigation elements, text, and so on. And identify common layout patterns, and stick to them.

If you're working with a designer, the best thing you can do is talk this stuff out. If you're designing and developing, make sure you think of the re-usability of your components / styles. Try to think of potential future updates. Try not to deviate drastically from the base styles.

I think the reasoning here is pretty sound, but I'm not much of a designer, so feel free to tell me off if I'm skipping over all kinds of important design concepts.

Have a good morning/day/evening!