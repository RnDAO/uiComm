export type DataType = 'string' | 'object' | 'array' | 'number' | 'boolean';
const STORAGE_PREFIX = "RNDAO_";

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
    localStorage.removeItem(STORAGE_PREFIX +key);
  }
}
