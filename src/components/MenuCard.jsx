import React from 'react'

const MenuCard = ({ emoji, name, votes }) => {
  return (
    <li className='card'>
      <div className="card_emoji">
        {emoji}
      </div>
      <div className="card__name">{name}</div>
      <div className="card__vote">{votes}</div>
      <button type='button' className='card__btn'>투표하기</button>
    </li>
  )
}

export default MenuCard
