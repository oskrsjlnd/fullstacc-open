import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from '../services/anecdotes'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (data) => successFunc(data),
    onError: (error) => dispatch({
      type: 'notification',
      payload: error.message
    })
  })
  const dispatch = useNotificationDispatch()

  const successFunc = (data) => {
    dispatch({
      type: 'notification',
      payload: `voted for ${data.content}`
    })
    queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  }

  const handleVote = (anecdote) => {
    console.log('vote')
    const upvoted = {
      ...anecdote,
      votes: anecdote.votes+1
    }
    voteAnecdoteMutation.mutate(upvoted)
    setTimeout(() => {
      dispatch({
        type: 'clearAll'
      })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading || result.isError ) {
    return <div>anecdote service not available due to problems in the server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
