import type { ProductTypes, CartItem } from '@/types'

const DB_NAME = 'maluxaryDB';
const DB_VERSION = 1;
const STORE_NAME = 'products';
const CART_NAME = 'carts'
const CURRENCY_NAME = 'currency'
const METADATA = 'matadata'

export const indexedDBService = {
  db: null as IDBDatabase | null,
  async openDB() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      // open the db
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      // when error occur
      request.onerror = () => {
        reject(request.error);
      };

      // when db is created get result when request to the db is successful
      request.onsuccess = () => {
        this.db = request.result;
        resolve(request.result);
      };

      // upgrades the db whenever there is a version change.
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(CART_NAME)) {
          db.createObjectStore(CART_NAME, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(CURRENCY_NAME)) {
          db.createObjectStore(CURRENCY_NAME);
        }
        if(!db.objectStoreNames.contains(METADATA)){
          db.createObjectStore(METADATA)
        }
      };
    });
  },

  async saveProducts(products: ProductTypes[]) {
    if (!this.db) {
      await this.openDB();
    }

    return new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      products.forEach((product) => {
        const sanitizeProduct = {
          id: product.id,
          title: product.title,
          price: product.price ?? 0,
          image_url: product.image_url
        }
        try {
          store.put(sanitizeProduct);
        } catch (err) {
          console.error('Error storing product:', err);
          reject(err)
        }
      });

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = () => {
        reject(transaction.error);
      };
    });
  },

  async getProducts(): Promise<ProductTypes[]> {
    if (!this.db) {
      await this.openDB();
    }

    return new Promise<ProductTypes[]>((resolve, reject) => {
      const transaction = this.db!.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  },

  async saveCartProducts(carts: CartItem[]) {
    if (!this.db) {
      await this.openDB();
    }
    return new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction(CART_NAME, 'readwrite');
      const store = transaction.objectStore(CART_NAME);

      carts.forEach((cart) => {
        try {
          const sanitizedCart = {
            id: cart.id,
            title: cart.title,
            price: cart.price ?? 0,
            image_url: cart.image_url,
            quantity: cart.quantity ?? 0,
            unitPrice: cart.unitPrice ?? 0
          }
          store.put(sanitizedCart);
        } catch (err) {
          console.error('Error storing cart:', err);
          reject(err)
        }
      });

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = () => {
        reject(transaction.error);
      };
    });
  },

  async getCartProducts(): Promise<CartItem[]>{
    if (!this.db) {
      await this.openDB();
    }

    return new Promise<CartItem[]>((resolve, reject) => {
      const transaction = this.db!.transaction(CART_NAME, 'readonly');
      const store = transaction.objectStore(CART_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  },

  async deleteItemFromCart(id: number) {
    if (!this.db) {
      await this.openDB();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(CART_NAME, 'readwrite');
      const store = transaction.objectStore(CART_NAME);
      const request = store.delete(id);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
    },

  async saveCurrency(currency: string) {
    if (!this.db) {
    await this.openDB();
  }
  return new Promise<void>((resolve, reject) => {
    const transaction = this.db!.transaction(CURRENCY_NAME, 'readwrite');
    const store = transaction.objectStore(CURRENCY_NAME);
    store.put(currency, 'currency');

    transaction.oncomplete = () => {
      resolve();
    };

    transaction.onerror = () => {
      reject(transaction.error);
    };
  })
  },

  async getCurrency(): Promise<string> {
    if(!this.db) {
      await this.openDB();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(CURRENCY_NAME, 'readonly');
      const store = transaction.objectStore(CURRENCY_NAME);
      const request = store.get('currency');

      request.onsuccess = () => {
        resolve(request.result || 'USD');
      };

      request.onerror = () => {
        reject(request.error);
      };
    })
  },

  async saveCachedTimeStamp(timeStamp: number): Promise<void> {
    if (!this.db) {
      throw new Error('Database is not initialized')
      }
      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(METADATA, 'readwrite');
        const store = transaction.objectStore(METADATA);

        const request = store.put(timeStamp, 'productsTimeStamp')

        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
      })
    },

    async getCachedTimeStamp(): Promise<number> {
      if (!this.db) {
        throw new Error('Database is not initialized')
      }
      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(METADATA, 'readonly');
        const store = transaction.objectStore(METADATA);

        const request = store.get('productsTimeStamp')

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
      })
    }
  }