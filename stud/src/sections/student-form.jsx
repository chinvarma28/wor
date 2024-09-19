import { useState, useEffect } from 'react';

const StudentForm = ({ student, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        major: '',
        usn: '',
        course: '', 
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (student) {
            // Exclude the id from the formData state
            const { id, ...rest } = student;
            setFormData(rest);
        }
    }, [student]);

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.age || isNaN(formData.age) || formData.age <= 0) newErrors.age = 'Age must be a positive number';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.major) newErrors.major = 'Major is required';
        if (!formData.usn) newErrors.usn = 'USN is required';
        if (!formData.course) newErrors.course = 'Course is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        if (validate()) {
            // Pass the id separately for update operations
            onSave({ ...formData, id: student?.id });
            // Optionally clear the form after submission
            setFormData({
                name: '',
                age: '',
                email: '',
                major: '',
                usn: '',
                course: '',
            });
            setErrors({});
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold">{student ? 'Update Student' : 'Add Student'}</h2>
            {Object.keys(formData).map((key) => (
                <div key={key} className="flex flex-col">
                    <label className="text-sm font-semibold mb-1 capitalize">{key}:</label>
                    <input
                        type="text"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className={`p-2 border rounded ${errors[key] ? 'border-red-500' : ''}`}
                    />
                    {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
                </div>
            ))}
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                {student ? 'Update' : 'Add'} Student
            </button>
        </form>
    );
};

export default StudentForm;
