export type DataType = 'string' | 'object' | 'array' | 'number' | 'boolean';
const STORAGE_PREFIX = 'TC_';

export class StorageService {
  public static readLocalStorage<T>(
    key: string,
    type: DataType = 'object'
  ): T | undefined {
    if (!key) return undefined;
    const data = localStorage.getItem(STORAGE_PREFIX + key);
    if (!data) return undefined;
    try {
      switch (type) {
        case 'string':
          return data as any;
        case 'number':
          return Number(data) as any;
        case 'boolean':
          return Boolean(data) as any;
        case 'array':
          return JSON.parse(data || '[]');
        default:
          return JSON.parse(data || '{}');
      }
    } catch (error) {
      return undefined;
    }
  }
  public static writeLocalStorage<T>(key: string, value: T): void {
    const v = typeof value === 'object' ? JSON.stringify(value) : String(value);
    localStorage.setItem(STORAGE_PREFIX + key, v);
  }
  public static removeLocalStorage(key: string): void {
    localStorage.removeItem(STORAGE_PREFIX + key);
  }
  public static updateLocalStorageWithObject<T extends object>(
    key: string,
    newObjectKey: string,
    newObject: string | Record<string, any>
  ): void {
    const currentObj = this.readLocalStorage<T>(key);

    if (!currentObj || typeof currentObj !== 'object') {
      console.error('Current value is not an object, or it does not exist');
      return;
    }

    if (typeof newObject === 'string') {
      (currentObj as any)[newObjectKey] = newObject;
    } else if (typeof newObject === 'object' && !Array.isArray(newObject)) {
      (currentObj as any)[newObjectKey] = newObject;
    } else {
      console.error(
        'newObject should be an object, a string, and not an array.'
      );
      return;
    }

    this.writeLocalStorage(key, currentObj);
  }
}
