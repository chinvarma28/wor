import { useState } from 'react';
import StudentForm from './sections/student-form';
import StudentList from './sections/student-list';
import axios from 'axios';


function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);

  const handleSave = async (student) => {
    try {
      if (student.id) {
        // Update
        await axios.put(`http://localhost:3000/students/${student.id}`, student);
      } else {
        // Add
        await axios.post('http://localhost:3000/students', student);
      }
      setSelectedStudent(null);
      // Refresh
      setStudents((prevStudents) =>
        prevStudents.map((s) => (s.id === student.id ? student : s))
      );
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  return (
    <div className="App">
      <div className="container mx-auto p-4">
        <StudentForm student={selectedStudent} onSave={handleSave} />
        <StudentList onEdit={setSelectedStudent} />
      </div>
    </div>
  );
}

export default App;
