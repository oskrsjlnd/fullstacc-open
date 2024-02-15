import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../../services/anecdotes'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (data) => successFunc(data),
    onError: (error) => dispatch({
      type: 'notification',
      payload: error.message
    })
  })

  const successFunc = (data) => {
    dispatch({
      type: 'notification',
      payload: `created anecdote: ${data.content}`
    })
    queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  }

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const id = Math.floor(Math.random() * 10000)
    const anecdote = {
      id,
      content,
      votes: 0
    }
    console.log(anecdote)
    newAnecdoteMutation.mutate(anecdote)
    setTimeout(() => {
      dispatch({
        type: 'clearAll'
      })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
