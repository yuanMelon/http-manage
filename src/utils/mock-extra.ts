import Mock from 'mockjs';

const strRegex = /\${([a-zA-Z]+)\.?([a-zA-Z0-9_\.]*)\}/i;
const varSplit = '.';
const mockSplit = '|';

Mock.Random.extend({
  timestamp: function() {
    const time = new Date().getTime() + '';
    return +time.substr(0, time.length - 3);
  }
});

function mock(mockJSON: any, context?: any): any {
  context = context || {};
  const filtersMap: { [key: string]: (item: any) => any } = {
    regexp: handleRegexp
  };

  if (!mockJSON || typeof mockJSON !== 'object') {
    return mockJSON;
  }

  return parse(mockJSON);

  function parse(p: any, c?: any): any {
    if (!c) {
      c = Array.isArray(p) ? [] : {};
    }

    for (const i in p) {
      if (!p.hasOwnProperty(i)) {
        continue;
      }
      if (p[i] && typeof p[i] === 'object') {
        c[i] = p[i].constructor === Array ? [] : {};
        parse(p[i], c[i]);
      } else if (p[i] && typeof p[i] === 'string') {
        p[i] = handleStr(p[i]);
        const filters = i.split(mockSplit);
        const newFilters = [...filters];
        c[i] = p[i];
        if (filters.length > 1) {
          for (let f = 1, l = filters.length, index; f < l; f++) {
            filters[f] = filters[f].toLowerCase();
            if (filters[f] in filtersMap) {
              if ((index = newFilters.indexOf(filters[f])) !== -1) {
                newFilters.splice(index, 1);
              }
              delete c[i];
              c[newFilters.join(mockSplit)] = filtersMap[filters[f]].call(p, p[i]);
            }
          }
        }
      } else {
        c[i] = p[i];
      }
    }
    return c;
  }

  function handleRegexp(item: any): RegExp {
    return new RegExp(item);
  }

  function handleStr(str: string): any {
    if (typeof str !== 'string' || str.indexOf('{') === -1 || str.indexOf('}') === -1 || str.indexOf('$') === -1) {
      return str;
    }

    const matches = str.match(strRegex);
    if (matches) {
      const name = matches[1] + (matches[2] ? '.' + matches[2] : '');
      if (!name) return str;
      const names = name.split(varSplit);
      let data = context;

      if (typeof context[names[0]] === 'undefined') {
        return str;
      }
      names.forEach(function(n) {
        if (data === '') return '';
        if (n in data) {
          data = data[n];
        } else {
          data = '';
        }
      });
      return data;
    }
    return str;
  }
}

export default mock;