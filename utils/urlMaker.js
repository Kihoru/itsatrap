export default {
  makeUrl(base, queryObj) {
    if (typeof queryObj == "string") {
      return `${base}/${queryObj}.json`;
    }
    let lat = queryObj.lat,
        long = queryObj.long,
        pos = queryObj.posField,
        lang = queryObj.langField,
        url = `${base}?`;

    if (lat && long) {
      url += `lat=${lat}&long=${long}`
    } else if (pos) {
      url += `location=${pos}`
    }
    if (lang) {
      let keyword = url == `${base}?` ? 'search' : '&description',
          langClean = lang.trim().toLowerCase().split(',').join('+').split(' ').join('+');
      url += `${keyword}=${langClean}`
    }
    return url;
  }
}