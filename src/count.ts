import { createStore, StoreState } from './createStore'

interface CountState {
  count: number
  addCount: () => void
}

export const useCount = createStore((set: StoreState<CountState>) => {
  let count: number = 1

  const addCount = () => {
    set(state => {
      return { ...state, count: ++count }
    })
  }

  return {
    count,
    addCount,
  }
})
