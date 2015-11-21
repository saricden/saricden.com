---
layout: article
title:  "How to Test Tiny Breakpoints in Chrome"
date:   2015-11-20
categories: blog

adModules:
  - ad_cluster

asideModules:
  - subscribe
  - about_author
---
If you're right into responsive web development it's super likely that you've already encountered and solved this, but nevertheless this might be a good trick to add to your bag!

<strong>Problem:</strong>

You know how you can't re-size the width of a Chrome window under a certain width (275 pixels wide to be exact)? This can be annoying when you're trying to test CSS media queries if you've got any under that width.

<strong>Solution:</strong>

Open up dev tools (Ctrl + Shift + I or Ctrl + Shift + J), make sure the dialog is part of the browser window (not opened in it's own window), and docked to the side. You can then re-size the width of the window using the bar separating Chrome's dev tools and the webpage.

Re-sizing the window this way enables you to reach widths less than 275 pixels (as of writing this the smallest width you can go appears to be 147 pixels across).

<img src="https://i.imgflip.com/uhmlv.jpg" class="meme" alt="Nailed it.">