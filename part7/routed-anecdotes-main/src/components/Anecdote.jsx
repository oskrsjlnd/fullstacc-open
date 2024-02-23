const Anecdote = ({ anecdote }) => {
  return (
    <>
      <p>{anecdote.content}</p>
      <p>{anecdote.author}</p>
      <p>{anecdote.info}</p>
    </>
  )
}

export default Anecdote