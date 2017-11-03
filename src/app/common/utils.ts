function findValue(obj: Object, prop: string, aliases: string[]): { [prop: string]: any } {
    if (!aliases.length) return;
    const key = aliases.shift();
    if (obj.hasOwnProperty(key)) {
      return { [prop]: obj[key] };
    }
    return findValue(obj, prop, aliases);
  }
  
  export function mapObject(data: Object, map: Object, defaults: any = {}): Object {
    const keys = Object.getOwnPropertyNames(map);
    let mapped = keys.reduce((acc, key) => {
      const aliases = [key, ...map[key]];
      const val = findValue(data, key, aliases);
      return { ...acc, ...val }
    }, {});
  
    return { ...defaults, ...mapped };
  }