export class Util {
  static isProd(): boolean {
    return 'production' === process.env.NODE_ENV;
  }

  static isTest(): boolean {
    return 'test' === process.env.NODE_ENV;
  }

  static chunk<T>(arr: T[], size: number): T[][] {
    return [...Array(Math.ceil(arr.length / size))].map((_, index) =>
      arr.slice(size * index, size + size * index),
    );
  }

  static currentSeconds(): number {
    const time = Date.now();
    return Math.round(time / 1000);
  }

  static percentage(n: number, total: number, invert = false): number {
    if (total === 0) {
      return 100;
    }
    return invert ? Math.floor((1 - n / total) * 100) : Math.floor((n / total) * 100);
  }

  static readBool(str: string | boolean, def = false): boolean {
    if (typeof str === 'boolean') {
      return str;
    }

    if (!str) {
      return def;
    }

    if (str.toLowerCase().startsWith('t') || parseInt(str) > 0) {
      return true;
    }

    if (str.toLowerCase().startsWith('f') || parseInt(str) === 0) {
      return false;
    }

    return def;
  }

  static readInt(str: string | number, def: number = null): number {
    if (typeof str === 'number') {
      return Math.round(str);
    }
    const parsedInt = parseInt(str, 10);
    return isNaN(parsedInt) ? def : parsedInt;
  }

  static readFloat(str: string | number, def: number = null): number {
    if (typeof str === 'number') {
      return str;
    }
    const parsedFloat = parseFloat(str);
    return isNaN(parsedFloat) ? def : parsedFloat;
  }

  static readString(str: string, def: string = null): string {
    return str || def;
  }

  static readJson<T>(json: string, def: T = null): T {
    try {
      const object = JSON.parse(json);
      return typeof object === 'object' ? object : def;
    } catch {
      return def;
    }
  }

  static async awaitSeconds(seconds: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(undefined);
      }, seconds * 1000);
    });
  }

  static async awaitMillis(millis: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(undefined);
      }, millis);
    });
  }

  static parseCsv = <T>(csv: string): T[] => {
    const rows = csv.split('\n');
    const columnNames = rows
      .shift()
      .split(',')
      .map((name) => name.toLowerCase().trim());

    return rows.map((row) => {
      return row.split(',').reduce((acc, current, index) => {
        acc[columnNames[index]] = current.trim();
        return acc;
      }, {});
    }) as T[];
  };
}
