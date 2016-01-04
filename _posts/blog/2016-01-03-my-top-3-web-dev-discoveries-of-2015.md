---
layout: article
title:  "My Top 3 Web Dev Discoveries of 2015"
date:   2016-01-03
categories: blog

adModules:
  - ad_cluster

asideModules:
  - subscribe
  - about_author
---
Well it's officially 2016. Er, 3 days into it to be precise. Nonetheless now is as good a time as any to reflect on stuff from the previous year. Today we'll look at: <em>My Top 3 Web Dev Discoveries of 2015!</em>

<strong>Note!</strong> This stuff didn't necessarily come out in 2015, I just found it then and may very well have been late to the party.

<h2>1: GitHub Pages & Jekyll</h2>

As someone who does not have millions of dollars, I'm all about super low overhead when starting a new website. I was therefore delighted to discover that GitHub offers a super straightforward way to <a href="https://pages.github.com/" target="_blank">publish static web pages</a> from your Git repositories hosted on GitHub. Just a quick push, and your website is updated. This is a beautiful way to integrate source control and simple deployment into any of your web projects in minutes.

The only problem that arises is that because this is static hosting (HTML, CSS, JS), you aren't allowed to run serverside code such as PHP or Ruby to do things like talk to a database or run a CMS (content management system). HOWEVER, this doesn't mean you can't manage content in a very similar fashion to a CMS system. Allow me to introduce <a href="https://jekyllrb.com/" target="_blank">Jekyll</a>! Jekyll is a very easy to use, fairly structure-less (in a good way), static site generator. You create templates (much like you would for a traditional CMS) using <a href="https://github.com/Shopify/liquid/wiki" target="_blank">Liquid</a>, write posts as Markdown files, and let Jekyll mush it all together and spit out a full static website with URL endpoints for every post, page, feed, and whatever else you made templates for.

The best part is that Github Pages inherently supports Jekyll! This means your freely hosted site can make use of Jekyll to manage it's content and make posting new stuff painless.

<strong>TL;DR:</strong> Free hosting from Github Pages paired w/ Jekyll static site generator basically makes the operating cost of a blog the cost of it's domain name (like $12 CAD / year).

<h2>2. Firebase</h2>

If instead of building a blog, you're looking to create a more intensive web app with things such as data persistence, login sessions, etc. you're probably still shying away from the idea of free static hosting. Well fear not! <a href="https://www.firebase.com/">Firebase</a> is an API service that enables developers to persist their app's data as a big chunk of JSON. Tailoring the structure of the JSON object will allow you to store anything from user account info to items in a game. It will automatically generate URL endpoints so you can access your data programmatically as your JSON blob grows.

With this service it's possible to build apps that are capable of securely persisting user information and whatever else you want to keep track of, without having to maintain your own backend. Granted you have less control over what goes on than if you coded the backend yourself, but you also don't need to spend as much time worrying about security, not to mention it's blazingly fast to setup.

<strong>TL;DR:</strong> Firebase is a great way to store data for your app securely and quickly, without requiring a backend. (And they have an excellent free plan!)

Also, the speed at which you can set it up makes it an ideal service for your next <em>hackathon!</em>

<h2>3. Apache Cordova and Ionic</h2>

I have long struggled with the idea of writing a massive code base for an Android app, only to have to tear it down and re-write the whole thing when I want to port it to iOS. Not only is this time consuming from the beginning, but it also poses problems later down the road when maintaining your app (not to mention if you're working in teams).

<a href="http://cordova.apache.org/" target="_blank">Apache Cordova</a> is a wonderful free, open source tool that enables developers to compile web code into native applications. Maintaining a single code base for your app makes it infinitely more manageable to work on by yourself, or in a team. Cordova essentially wraps your web code in a seamless browser and compiles it into an app for whatever platforms you wish to target.

Now while it's true that this extra layer can damage performance, I don't think it's something you'll notice or need to worry about unless you are developing a very power-hungry app such as a game running intensive graphics and/or physics engines.

Going hand in hand with Cordova is the <a href="http://ionicframework.com/" target="_blank">Ionic Framework</a>. This framework gives you access to a library of modules that can be implemented in your HTML that give you many native app components such as side menus, tabs, etc. The clever thing about Ionic is it is setup to detect the OS of the device running the app and display the appropriate native UI. For example, if your app is running on iOS, the components will have an iOS 'look and feel' to them, whereas if you ran the app on Android, the UI would appear to be using the native Android components.

<strong>TL;DR:</strong> Apache Cordova & the Ionic Framework enable app developers to create native-looking apps, exported to a wide range of devices, with a single code base.

So anyways, those are probably my top 3 discoveries of last year. Stay tuned as I'll be throwing up some tutorials and/or more articles later on this year as I further use all of the above.