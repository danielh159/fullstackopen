import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // Adds scores to a new array
  const [scores, setScores] = useState([])

  // Event handlers for each button
  const handleGood = () => {
    setScores(scores.concat(1))
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setScores(scores.concat(0))
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setScores(scores.concat(-1))
    setBad(bad + 1)
  }

  // Calculate total # of collected feedback
  const total = good + neutral + bad

  // Calculate avg scores
  const scoreSum = scores.reduce((a, b) => a + b, 0)
  const scoreAvg = (scoreSum / scores.length) || 0

  // Calculate % of positive feedback
  const goodPercentage = good / total * 100 || 0
  const percentage = goodPercentage.toString() + ' %'

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text={'good'} />
      <Button onClick={handleNeutral} text={'neutral'} />
      <Button onClick={handleBad} text={'bad'} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={total}
        avg={scoreAvg}
        percentage={percentage}
      />
    </div>
  )
}

const Button = (props) => (
  <button onClick = {props.onClick}>{props.text}</button>
)

const Statistic = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <Statistic text={'good'} value={props.good} />
            <Statistic text={'neutral'} value={props.neutral} />
            <Statistic text={'bad'} value={props.bad} />
            <Statistic text={'all'} value={props.all} />
            <Statistic text={'average'} value={props.avg} />
            <Statistic text={'positive'} value={props.percentage} />
          </tbody>
        </table>
      </div>
    )
  }
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)