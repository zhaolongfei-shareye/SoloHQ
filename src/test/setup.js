import '@testing-library/jest-dom/vitest'

class LocalStorageMock {
  constructor() {
    this.store = new Map()
  }

  get length() {
    return this.store.size
  }

  key(index) {
    return [...this.store.keys()][index] ?? null
  }

  getItem(key) {
    return this.store.has(String(key)) ? this.store.get(String(key)) : null
  }

  setItem(key, value) {
    this.store.set(String(key), String(value))
  }

  removeItem(key) {
    this.store.delete(String(key))
  }

  clear() {
    this.store.clear()
  }
}

if (!window.localStorage) {
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: new LocalStorageMock(),
  })
}
