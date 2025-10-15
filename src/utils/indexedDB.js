const DB_NAME = 'CricketScoreboard'
const DB_VERSION = 1
const STORE_NAME = 'matchData'

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }
  })
}

export const saveMatchData = async (data) => {
  const db = await initDB()
  const transaction = db.transaction([STORE_NAME], 'readwrite')
  const store = transaction.objectStore(STORE_NAME)
  await store.put({ id: 'currentMatch', ...data })
}

export const loadMatchData = async () => {
  const db = await initDB()
  const transaction = db.transaction([STORE_NAME], 'readonly')
  const store = transaction.objectStore(STORE_NAME)
  const request = store.get('currentMatch')
  
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export const clearMatchData = async () => {
  const db = await initDB()
  const transaction = db.transaction([STORE_NAME], 'readwrite')
  const store = transaction.objectStore(STORE_NAME)
  await store.delete('currentMatch')
}