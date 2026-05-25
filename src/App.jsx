import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [students, setStudent] = useState([]);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");

  useEffect(()=> {
    fetch("http://localhost:3000/api/students")
    .then(res => res.json())
    .then(data => setStudent(data))
    .catch(err => console.error(err))
  }, []);

  const addStudent = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          grade
        })
      });

      const newStudent = await res.json();

      setStudent([...students, newStudent.data]);

      alert(newStudent.message);
      setName("");
      setGrade("");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>Student List</h1>
      <ul>
        {students.map((student)=> (
          <li key={student.id}>{student.name} - {student.grade}</li>
        ))}
      </ul>

      <hr />

      <h2>Add New Student</h2>
      <form onSubmit={addStudent}>
        <input type="text" placeholder='student name' onChange={(e) => setName(e.target.value)} value={name}/> <br /><br />
        <input type="text" placeholder='student grade' onChange={(e)=> setGrade(e.target.value)} value={grade}/> <br /><br />
        <input type="submit" />
      </form>
    </>
  )
}

export default App
