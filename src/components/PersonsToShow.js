import React from 'react'

const PersonsToShow = ({ persons, filter}) => {
    const list = persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    return (
      <ul>
      {list.map(person =>
        <li key={person.name}>{person.name} {person.number}</li>
      )}
    </ul>
    )
  } 

  export default PersonsToShow