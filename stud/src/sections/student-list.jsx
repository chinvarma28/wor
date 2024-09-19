import { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = ({ onEdit }) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/students');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/students/${id}`);
            setStudents(students.filter((student) => student.id !== id));
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Student List</h1>
            <table className="min-w-full bg-white border border-gray-300 rounded shadow-md">
                <thead>
                    <tr className="border-b">
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Age</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Major</th>
                        <th className="p-2 text-left">USN</th>
                        <th className="p-2 text-left">Course</th>
                        <th className="p-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td className="p-2">{student.name}</td>
                            <td className="p-2">{student.age}</td>
                            <td className="p-2">{student.email}</td>
                            <td className="p-2">{student.major}</td>
                            <td className="p-2">{student.usn}</td>
                            <td className="p-2">{student.course}</td>
                            <td className="p-2">
                                <button
                                    onClick={() => onEdit(student)}
                                    className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(student.id)}
                                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600 ml-2"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
