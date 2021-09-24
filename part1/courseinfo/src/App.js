import React, { useState } from 'react';

const StatisticLine = ({ text, value }) => <div>{text} {value}</div>;

const Statistics = ({ good, neutral, bad }) => {
  if (!good && !neutral && !bad) {
    return <div>No feedback given</div>
  }

  const average = () => {
    let result = 0;
    result = (good - bad) / (good + neutral + bad);
    return result;
  }
  const positive = () => {
    let result = good / (good + neutral + bad);
    return result * 100 + '%';
  }

  return (
    <div>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={good + neutral + bad} />
      <StatisticLine text='average' value={average()} />
      <StatisticLine text='positive' value={positive()} />
    </div>
  );
}
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => setGood(pre => pre + 1)}>good</button>
        <button onClick={() => setNeutral(pre => pre + 1)}>neutral</button>
        <button onClick={() => setBad(pre => pre + 1)}>bad</button>
      </div >
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div >
  );
}

export default App;
