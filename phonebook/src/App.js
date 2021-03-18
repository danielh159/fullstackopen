import React, { useState, useEffect } from "react"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/persons"

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState("")
  const [ newNumber, setNewNumber ] = useState("")
  const [personFilter, setFilter ] = useState("")
  const [notification, setNotification ] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    const duplicateNameFinder = persons.find(person => 
      person.name === newName
    )
    const duplicateNumberFinder = persons.find(person => 
      person.number === newNumber
    )

    // Make sure no duplicate names/numbers are entered
    if (duplicateNameFinder !== undefined) {
      // If confirmed, update the number
      if (window.confirm(
        `${duplicateNameFinder.name} is already added to` +
        ` phonebook, replace the old number with a new one?`
      )) {
        const person = persons.find(p => 
          p.name === duplicateNameFinder.name
        )
        const changedNumber = { ...person, number: newNumber }

        personService
          .update(duplicateNameFinder.id, changedNumber)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.name !== duplicateNameFinder.name
                ? person : returnedPerson 
            ))
          })
          .catch(error => {
            setNotification(
              `Information of ${duplicateNameFinder.name} has ` + 
              `already been removed from server`
            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            setPersons(persons.filter(p =>
              p.name !== duplicateNameFinder.name
            ))
          })
      }
    } else if (duplicateNumberFinder !== undefined) {
      alert(`${newNumber} already exists as a phone number`)

    // Make sure form is not incomplete
    } else if (newName === ("")) {
      alert(`Please enter a name`)
    } else if (newNumber === ("")) {
      alert(`Please enter a phone number`)
    } else {

      personService
        .create(personObject)
        .then(returnedPerson => {
          setNotification(
            `Added ${personObject.name}`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.concat(returnedPerson).sort((a, b) => {
            let na = a.name.toLowerCase()
            let nb = b.name.toLowerCase()

            if (na < nb) {
              return -1
            }
            if (na > nb) {
              return 1
            }
            return 0
          }))
          setNewName("")
          setNewNumber("")
        })

    }
  }

  const deleteThisPerson = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      const person = persons.find(p => p.name === name)
      const deletedPerson = { ...person, name }

      personService
        .deleteObject(id, deletedPerson)
        setNotification(`Deleted ${name}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setPersons(persons.filter(person => person.name !== name))
    }
  }

  const handleAddPerson = (event) => {
    setNewName(event.target.value)
  }
  const handleAddNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const filterChange = (event) => {
    setFilter(event.target.value)
  }
  const filterPhonebook = persons.filter(person =>
    person.name.toLowerCase().includes(personFilter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification
        message={notification}
        deletedName={newName}
      />

      <Filter personFilter={personFilter} filterChange={filterChange} />

      <h2>add a new</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleAddPerson={handleAddPerson}
        newNumber={newNumber}
        handleAddNumber={handleAddNumber}
      />

      <h2>Numbers</h2>

      {filterPhonebook.map(person =>
        <Persons
          key={person.name}
          person={person}
          deletePerson={() => deleteThisPerson(person.name, person.id)}
        />
      )}
    </div>
  )
}

export default App