const Filter = ({ nameContains, handleFilterChange }) => {
    return (
      <>
        <h2>Phonebook</h2>
        <div>
          filter shown with: <input value={nameContains} onChange={handleFilterChange} />
        </div>
      </>
    )
  }

export default Filter