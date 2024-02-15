import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    create(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const anec = action.payload
      return state.map(anecdote =>
        anec.id !== anecdote.id
        ? anecdote
        : anec
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { create, vote, setAnecdotes } = anecdoteSlice.actions

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNew = anecdote => {
  return async dispatch => {
    const created = await anecdoteService.newAnecdote(anecdote)
    dispatch(create(created))
  }
}

export const newVote = anecdote => {
  return async dispatch => {
    const voted = await anecdoteService.castVote(anecdote)
    dispatch(vote(voted))
  }
}

export default anecdoteSlice.reducer