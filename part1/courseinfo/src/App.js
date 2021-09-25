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

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
];

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });

  const [selected, setSelected] = useState(0);

  const nextAnecdotes = () => {
    setSelected(Math.floor(Math.random() * 7));
  }
  const handleVotes = () => {
    setVotes(pre => ({ ...pre, [selected]: pre[selected] + 1 }))
  }

  const findMostVote = () => {
    let index = 0;
    let maxVote = 0;
    for (let i in votes) {
      if (votes[i] > maxVote) {
        maxVote = votes[i];
        index = i;
      }
    }
    console.log('index: ', index);
    return index;
  }

  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <div>
        <button onClick={handleVotes}>vote</button>
        <button onClick={nextAnecdotes}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <div>
        <p>{anecdotes[findMostVote()]}</p>
      </div>
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
