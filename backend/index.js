const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan((tokens, req, res) => {
  if (req.method === 'POST') {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ');
  }
}));

const persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(person => person.id == id);
  if (person) {
    res.json(person);
  } else {
    res.json({ message: 'not found' });
  }
});
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const index = persons.findIndex(person => person.id == id);
  if (index > -1) {
    persons.splice(index, 1);
    res.status(204).end();
  }
});

app.post('/api/persons', (req, res) => {
  const person = req.body;
  if (!person.name || !person.number) {
    res.json({ error: '姓名或电话不能为空' }).end();
    return;
  }
  const result = persons.find(item => item.name === person.name);
  if (result) {
    console.log('result: ', result);
    res.json({ error: `${result.name}已经存在` }).end();
  } else {
    person.id = Math.floor(Math.random() * 10000);
    persons.push(person);
    res.json(person);
  }
})

app.get('/info', (req, res) => {
  res.send(`
  <div>电话簿有${persons.length}条信息</div>
  <div>${new Date()}</div>
  `)
})

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`);
})