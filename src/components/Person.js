import React from 'react'

const Person = ({ person, DeletePerson }) => {

  return (
    <li>
      {person.name} {person.number} 
      <button onClick={DeletePerson}>{'delete'}</button>
    </li>
  )
}

export default Person