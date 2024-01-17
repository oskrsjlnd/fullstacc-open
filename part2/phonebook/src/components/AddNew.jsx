const AddNew = ({ newName, newNumber, handleNameChange, handleNumberChange, handleSubmitPerson }) => {
    return (
      <form>
        <h2>
          add a new
        </h2>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={handleSubmitPerson}>add</button>
        </div>
      </form>
    )
  }

export default AddNew