import { useState, useEffect} from 'react'
import Numbers from './components/Numbers'
import AddNew from './components/AddNew'
import Filter from './components/Filter'
import contactService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  const [nameContains, setNameContains] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    contactService
      .fetchPersons()
      .then(fetchedPersons => {
        setPersons(fetchedPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmitPerson = (event) => {

    const updatePerson = (name) => {
      event.preventDefault()
      const personToUpdate = persons.find(person => person.name === name)
      if (window.confirm(`Do you want to update the number for ${name}?`)) {
        const updatedPerson = {...personToUpdate, number: newNumber}
        const id = personToUpdate.id
        contactService
          .updateNumber(id, updatedPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(person => person.id === returnedPerson.id ? {...person, number: newNumber} : person)
            )
          })
      }
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      updatePerson(newName)
    } else {
      contactService
        .newPerson(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        setNewName('')
        setNewNumber('')
    }
  }

  const handleDeletePerson = (event) => {
    event.preventDefault()
    const id = event.target.id
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Do you want to delete ${personToDelete.name}`)) {
      contactService
        .deletePerson(id)
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.id !== id))
          console.log('person', returnedPerson, 'was deleted')
        })
        .catch(error => {
          alert(`the person ${personToDelete} could not be found on the server`)
        })
    }
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNameContains(event.target.value)
  }
  return (
    <div>
      <Filter 
        nameContains={nameContains}
        handleFilterChange={handleFilterChange} 
      />
      <AddNew
        persons={persons} 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmitPerson={handleSubmitPerson} 
      />
      <Numbers
        persons={persons} 
        nameContains={nameContains} 
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  )
}

export default App