---
layout: single
title:  "Box Model Debugging Trick"
date:   2015-07-26
categories: blog
---
A friend of at work used to always throw outlines on stuff when she wanted to debug something that wasn't quite right with the element's box model (margin, padding, border).

This is an extension of that trick, just throw this snippet anywhere in your stylesheet and it works like a charm:

{% highlight css %}
*:hover {
  outline: solid 1px red;
}
{% endhighlight %}

Hover your cursor over anything and it'll outline it and help you pinpoint whatever isn't picking up properly.

Shout out to <a href="http://staciedaponte.net/" target="_blank">Stacie DaPonte</a> for the original outline trick!