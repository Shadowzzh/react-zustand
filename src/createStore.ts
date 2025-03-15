import { useRef, useEffect, useReducer } from 'react'

type StorePartial<S> = (state: S) => S
export type StoreState<S> = (state: StorePartial<S>) => void

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createStore = <H extends (setState: StoreState<ReturnType<H>>) => any>(hook: H) => {
  type HReturnParams = ReturnType<H>
  type Listener = (state: HReturnParams) => void
  type Partial = StorePartial<HReturnParams>

  let state: HReturnParams
  const listeners = new Set<Listener>()

  const setState = (partial: Partial) => {
    const nexState = partial(state)

    if (nexState !== state) {
      state = Object.assign({}, state, nexState)
      for (const listener of listeners) {
        listener(state)
      }
    }
  }

  // 初始化状态
  state = hook(setState)

  // 提供给子组件的 API 方法
  const useStore = () => {
    const storeRef = useRef(state)
    const [, forceUpdate] = useReducer(c => c + 1, 0)

    useEffect(() => {
      function listener(newStore: HReturnParams) {
        storeRef.current = newStore
        forceUpdate()
      }

      listeners.add(listener) // 初始化的时候添加回调，订阅更新

      return () => {
        listeners.delete(listener)
      } // 组件销毁的时候移除回调
    }, [])

    return storeRef.current
  }

  return useStore
}
