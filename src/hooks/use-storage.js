export default function useStorage() {
  function getItem(key) {
    const item = localStorage.getItem(key)
    return item
  }

  function setItem(key, value) {
    localStorage.setItem(key, value)
  }

  function deleteItem(key) {
    localStorage.removeItem(key)
  }

  return {
    getItem,
    setItem,
    deleteItem
  }
}
