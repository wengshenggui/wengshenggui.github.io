---
layout: compress

# The list to be cached by PWA
---

const resource = [

  '{{ "/manifest.json" | relative_url }}',

  /* --- CSS --- */
  '{{ "/assets/css/style.css" | relative_url }}',

  /* --- JavaScripts --- */
  {% assign js_path = "/assets/js" | relative_url %}
  '{{ js_path }}/dist/commons.min.js',
  '{{ js_path }}/dist/home.min.js',
  '{{ js_path }}/dist/page.min.js',
  '{{ js_path }}/dist/post.min.js',
  '{{ js_path }}/dist/categories.min.js',
  '{{ js_path }}/data/search.json',
  '{{ "/app.js" | relative_url }}',
  '{{ "/sw.js" | relative_url }}',

  /* --- HTML --- */
  '{{ "/index.html" | relative_url }}',
  '{{ "/404.html" | relative_url }}',
  {% for tab in site.tabs %}
    '{{ tab.url | relative_url }}',
  {% endfor %}

  /* --- Favicons --- */
  {% assign favicon_path = "/assets/favicons" | relative_url %}

  '{{ favicon_path }}/favicon.ico',
  '{{ favicon_path }}/favicon.png',
  '{{ favicon_path }}/favicon.svg'

];

/* The request url with below domain will be cached */
const allowedDomains = [
  '{{ site.url | split: "//" | last }}',

  'fonts.gstatic.com',
  'fonts.googleapis.com',
  'cdn.jsdelivr.net',
  'polyfill.io'
];

/* Requests that include the following path will be banned */
const denyUrls = [
  {% if site.google_analytics.pv.cache_path %}
    '{{ site.google_analytics.pv.cache_path | absolute_url }}'
  {% endif %}
];
