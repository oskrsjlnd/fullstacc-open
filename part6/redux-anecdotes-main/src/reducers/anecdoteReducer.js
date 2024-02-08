const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortAnecdotes = (anecdotes) => {
  return anecdotes.sort((a, b) => b.votes - a.votes)
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'vote': {
      const id = action.payload.id
      const anecdote = state.find(anecdote => anecdote.id === id)
      const upvoted = {
        ...anecdote,
        votes: anecdote.votes+1
      }
      return sortAnecdotes(state.map(anec =>
        anec.id !== id
        ? anec
        : upvoted
      ))
    }
    case 'new_anecdote': {
      return sortAnecdotes([...state, action.payload])
    }
    default:
      return sortAnecdotes(state)
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'vote',
    payload: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'new_anecdote',
    payload: asObject(content)
  }
}

export default reducer