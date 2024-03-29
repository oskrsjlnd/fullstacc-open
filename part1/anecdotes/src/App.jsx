import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const initialValue = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0
  }
  const [votes, setVotes] = useState(initialValue)
  const [selected, setSelected] = useState(0)
  const [highestVote, setHighestVote] = useState(0)

  const handleNext = () => {
    function getRandomInt() {
      return Math.floor(Math.random() * (8))
    }
    const updatedSelect = getRandomInt()
    setSelected(updatedSelect)
    console.log('New selected', updatedSelect)
  }
  
  const handleVote = () => {
    const copy = { ...votes }
    copy[selected] += 1
    console.log(copy)
    setVotes(copy)
    if (copy[selected] > votes[highestVote]) {
      setHighestVote(selected)
      console.log('New highest vote', highestVote)
    }
  }

  return (
    <div>
      <Anecdote text='Anecdote of the day' anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button text={'vote'} onClick={console.log('x')} />
      <Button text={'Next anecdote'} onClick={handleNext} />
      <Anecdote text={'Anecdote with most votes'} anecdote={anecdotes[highestVote]} votes={votes[highestVote]} />
    </div>
  )
}

const Button = ({ text, onClick }) => {
  return (
    <>
      <button onClick={onClick}>
        {text}
      </button>
    </>
  )
}

const Anecdote = ({ text, anecdote, votes }) => {
  return (
    <>
    <h1>
      {text}
    </h1>
    <p>
      {anecdote}
    </p>
    <p>
      has {votes} votes
    </p>
    </>
  )
}

export default App