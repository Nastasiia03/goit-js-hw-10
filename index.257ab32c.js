var t;fetch(`https://restcountries.com/v3.1/name/${t}?fields=name,capital,population,flags,languages`).then((t=>{if(!t.ok)throw new Error(t.statusText);return t.json()}));
//# sourceMappingURL=index.257ab32c.js.map
