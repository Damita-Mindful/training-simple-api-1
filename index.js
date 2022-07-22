const express = require('express');
const app = express();

app.use(express.json());

const students = [
  {id: 1, name: 'Dami', age: 34, enroll: true},
  {id: 2, name: 'Jorge', age: 34, enroll: false},
  {id: 3, name: 'Ane', age: 12, enroll: false},
  {id: 4, name: 'Fede', age: 33, enroll: false},
];

app.get('/', (req, res) => {
  res.send('Node JS api')
});

app.get('/api/students', (req, res) => {
  res.send(students)
})

app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if(!student) return res.status(404).send('Student not found');
  else res.send(student)
});


app.post('/api/students', (req, res) => { 
  const student = {
    id: students.length +1,
    name: req.body.name,
    age: parseInt(req.body.age),
    enroll: (req.body.enroll === 'true')
  };
  students.push(student)
  res.send(student)
})


app.delete('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).send('Student not found');

  const index = students.indexOf(student);
  students.splice(index, 1);
  res.send(student)
})


const port = process.env.port || 80;
app.listen(port, () => console.log(`Listening in port ${port}...`)); 