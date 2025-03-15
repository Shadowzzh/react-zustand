import './styles.css'
import { useCount } from './count'
import React from 'react' // 添加此行以确保 React 被正确导入

export default function App() {
  const { count, addCount } = useCount()
  return (
    <div className='App'>
      <h1>Hello CodeSandbox</h1>
      <h2>开始编辑以查看一些魔法发生！</h2>
      <div>{count}</div>
      <button onClick={() => addCount()}>+</button>
    </div>
  )
}
