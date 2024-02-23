import { useMatch, Link, Routes, Route } from 'react-router-dom'
import AnecdoteList from '../components/AnecdoteList'
import About from '../components/About'
import CreateNew from '../components/CreateNew'
import Anecdote from '../components/Anecdote'


const Menu = ({ anecdotes, addNew, notification }) => {
  const padding = {
    paddingRight: 5
  }
  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null
  return (
    <div>

      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create_new' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
      <p>{notification}</p>
      
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/create_new' element={<CreateNew addNew={addNew} />} />
        <Route path='/about' element={<About />} />
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
      </Routes>
    </div>
  )
}

export default Menu