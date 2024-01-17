const Person = ({ id, name, number, handleDeletePerson }) => {
  return (
    <tr key={id}>
      <td>{name}</td>
      <td>{number}</td>
      <td>
        <button type="submit" id={id} onClick={handleDeletePerson}>delete</button>
      </td>
    </tr>
  )
}

const Numbers = ({ persons, nameContains, handleDeletePerson, setDeleteId }) => {
    const filtered = persons.filter(person => person.name.includes(nameContains))
    return (
      <>
        <h2>Numbers</h2>
        <table>
        <tbody>
          {filtered.map(person =>
            <Person 
              key={person.id}
              id={person.id}
              name={person.name}
              number={person.number}
              handleDeletePerson={handleDeletePerson}
            />
          )}
        </tbody>
        </table>
      </>
    )
  }

export default Numbers