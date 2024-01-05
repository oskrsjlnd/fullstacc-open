import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  let avg = 0
  let positive = 0
  if (total !== 0) {
    avg = (good * 1 + bad * -1) / total
    console.log('average', avg)
    positive = good * 1 / total * 100
    console.log('positive', positive)
  }

  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: total,
    avg: avg,
    positive: positive
  }
  console.log(statistics)

  const handleGoodVote = () => {
    const updatedGood = good + 1
    console.log('updated good votes', updatedGood)
    setGood(updatedGood)
    const newTotal = updatedGood + neutral + bad
    console.log('new total votes', newTotal)
    setTotal(newTotal)
  }
  
  const handleBadVote = () => {
    const updatedBad = bad + 1
    console.log('new bad', updatedBad)
    setBad(updatedBad)
    const newTotal = good + neutral + updatedBad
    console.log('new total votes', newTotal)
    setTotal(newTotal)
  }

  const handleNeutralVote = () => {
    const updatedNeutral = neutral + 1
    console.log('new neutral', updatedNeutral)
    setNeutral(updatedNeutral)
    const newTotal = good + updatedNeutral + bad
    setTotal(newTotal)
    console.log('new total votes', newTotal)

  }

  return (
    <div>
      <Header text={'give feedback'} />
      <Button text={'good'} handleVote={handleGoodVote} />
      <Button text={'neutral'} handleVote={handleNeutralVote}/>
      <Button text={'bad'} handleVote={handleBadVote} />
      <Header text={'statistics'} />
      <Statistics stats={statistics} />
    </div>
  )
}

const Statistics = ({ stats }) => {
  if (stats.total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text={'good'} value={stats.good} />
        <StatisticLine text={'neutral'} value={stats.neutral} />
        <StatisticLine text={'bad'} value={stats.bad} />
        <StatisticLine text={'all'} value={stats.total} />
        <StatisticLine text={'average'} value={stats.avg} />
        <StatisticLine text={'positive'} value={stats.positive} unit={' %'} />
      </tbody>
    </table>
  )
}

const Header = ({ text }) => {
  return (
    <h1>
      {text}
    </h1>
  )
}

const Button = ({ handleVote, text }) => {
  return (
    <button onClick={handleVote}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
export default App