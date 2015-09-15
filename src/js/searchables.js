---
layout: null
---
var searchables = [
  {% for post in site.posts %}
    {
      title: "{{ post.title }}",
      snippet: {{ post.content | truncatewords(20) | jsonify }},
      url: "{{ post.url }}"
    },
  {% endfor %}
];