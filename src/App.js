import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
//import PersonsToShow from './components/PersonsToShow'
import Notification from './components/Notification'
import PhoneBookService from './services/PhoneBook'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [Message, setMessage] = useState({message: null, style: true})

  useEffect(() => {
    console.log('effect')
    PhoneBookService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
          name: newName,
          number: newNumber
    }

    if (persons.map(person => person.name).indexOf(newName)!==-1) {
        console.log('Nimi oli jo: ', newName)
        if (window.confirm(`${newName} is already added to phonebook, replace the older number with a new one?`)) {
          PhoneBookService
            .update(persons.find(person => person.name === newName).id, newPerson)
            .then(updated => {
              setPersons(persons.map(person => person.name !== newName ? person : updated))
            })
            .catch(error => {
              setMessage({message: `Information of ${newName} has already been removed from server`, style: false})
              setTimeout(() => {
                setMessage({message: null, style: true})
              }, 3000)
              setPersons(persons.filter(n => n.name !== newName))
            })
          setMessage({message: `Updated ${newName}`, style: true})
          setTimeout(() => {
            setMessage({message: null, style: true})
          }, 3000)
        }
        setNewName('')
        setNewNumber('')
    } else {
        console.log('Lisätään uusi nimi: ', newName)
        PhoneBookService
          .create(newPerson)
          .then(ServerNewPerson => {
            setPersons(persons.concat(ServerNewPerson))
          })
          .catch(error => {
            console.log('ErrorMessage: ', error.response.data)
            setMessage({message: error.response.data.error, style: false})
            setTimeout(() => {
              setMessage({message: null, style: true})
            }, 3000)
          })
        console.log('persons: ', persons)
        setMessage({message: `Added ${newName}`, style: true})
        setTimeout(() => {
          setMessage({message: null, style: true})
        }, 3000)
        setNewName('')
        setNewNumber('')
    }

  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const PersonsToShow = 
    persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
  

  const DeletePerson = (id) => {

    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      PhoneBookService
        .remove(id)
        .then(deleted => {
          setPersons(persons.filter(person => person.id !== id))
        })
      setMessage({message: `Deleted ${newName}`, style: true})
      setTimeout(() => {
        setMessage({message: null, style: true})
      }, 3000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={Message} />
      <Filter text = 'filter shown with ' filter = {filter} handler = {handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addName = {addName} newName = {newName} handleNameChange = {handleNameChange} 
        newNumber = {newNumber} handleNumberChange = {handleNumberChange} />
      <h2>Numbers</h2>
      <ul>
        {PersonsToShow.map((person, i) => 
          <Person
            key = {i}
            person = {person}
            DeletePerson = {() => DeletePerson(person.id)}
          />
        )}
      </ul>
    </div>
  )

}

export default App