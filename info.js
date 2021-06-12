function filterHtml(info, deep = 0) {
  if (info instanceof Array) {
    if (info.every(item =>
      typeof item === 'string' &&
      /<html.*>.*<\/html>|^$/m.test(item))
    ) {
      return []
    }
  }

  for (const key in info) {
    const item = info[key]
    if (typeof item === 'object') {
      info[key] = filterHtml(item, deep+1)
    }
  }

  return info
}


// console.log(_siteInfo)
filterHtml(_siteInfo)

console.log(_siteInfo)