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

<strong>Style majority first. Only be specific when you need to be.</strong>

Admittedly, this can be difficult to maintain in practise. It's very easy to think only of the end result, and not factor in potential (perhaps inevitable) changes, and scope additions.

A couple of things to establish before building anything: figure out consistent fonts for headings, navigation elements, text, and so on. Identify common layout patterns, and stick to them.

Once you've located the common design patterns that are consistent throughout (hopefully) several areas, build those first. Then if the homepage has a big header image, or there's a page with some special layout, write specific selectors for those edge cases.

If you're working with a designer, the best thing you can do is talk this stuff out. If you're designing and developing, make sure you think of the re-usability of your components / styles. Try to think of potential future updates. Try not to deviate drastically from the base styles.

I think the reasoning here is pretty sound, but I'm not much of a designer, so feel free to tell me off if I'm skipping over all kinds of important design concepts.

Good day!