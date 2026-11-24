import './App.css'
import Header from './components/Header'
import MenuCard from './components/MenuCard'
import AddMenu from './components/AddMenu'
import { initalMenus } from './data'
import { useEffect, useState } from 'react'

function localMenus() {
  const saved = localStorage.getItem('lunch-menus');
  return saved ? JSON.parse(saved):initalMenus
}

function App() {
  const [menus, setMenus] = useState(initalMenus);

  const total = menus.reduce((sum, m) => sum + m.votes, 0)
  const topVotes = Math.max(...menus.map((m) => m.votes))

  useEffect(()=>{
    document.title=`${total}표 투표중`
  },[total])

  useEffect(()=>{
    localStorage.setItem('lunch-menus',JSON.stringify(menus))
  },[menus])

  const vote = (id) => {
    setMenus(menus.map((m) => (m.id === id) ? { ...m, votes: m.votes + 1 } : m))
  }

  const addMenu = (name) => {
    setMenus([...menus, {
      id: Date.now(),
      emoji: '👍',
      name: name,
      votes: 0
    }])
  }

  const reset = () => {
    setMenus(menus.map((m) => ({ ...m, votes: 0 })))
  }

  return (
    <div className='app'>
      <Header title={'⚖️오늘의 밸런스 게임'} total={total}/>
      <AddMenu onAdd={addMenu} />
      <ul className='menus'>
        {menus.map((m) => (
          <MenuCard
            key={m.id}
            {...m}
            isTop={topVotes > 0 && m.votes == topVotes}
            onVote={() => vote(m.id)} />
        ))}
      </ul>

      <footer className='footer'>
        <button type='button' className='reset' onClick={reset}>투표 초기화</button>
      </footer>
    </div>
  )
}

export default App
