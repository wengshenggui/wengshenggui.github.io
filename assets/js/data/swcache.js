---
layout: compress

# The list to be cached by PWA
---

const resource = [

  '{{ "/manifest.json" | relative_url }}',

  {% for item in site.static_files %}
    '{{ item.path | relative_url }}',
  {% endfor %}

  /* --- CSS --- */
  '{{ "/assets/css/style.css" | relative_url }}',

  /* --- JavaScripts --- */
  {% assign js_path = "/assets/js" | relative_url %}
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
];

/* The request url with below domain will be cached */
const allowedDomains = [
  '{{ site.url | split: "//" | last }}',

  'cdn.jsdelivr.net',
  'polyfill.io'
];

/* Requests that include the following path will be banned */
const denyUrls = [
];

function verifyDomain(url) {
  for (const domain of allowedDomains) {
    const regex = RegExp(`^http(s)?:\/\/${domain}\/`);
    if (regex.test(url)) {
      return true;
    }
  }

  return false;
}

function isExcluded(url) {
  for (const item of denyUrls) {
    if (url === item) {
      return true;
    }
  }
  return false;
}

function notAllowCache(url, method) {
  return method !== 'GET' || !verifyDomain(url) || isExcluded(url)
}
