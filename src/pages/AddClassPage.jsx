import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import {db} from '../services/firebase'
import {collection,addDoc} from 'firebase/firestore'
import Swal from 'sweetalert2'

export default function AddClassPage() {
    const [className, setClassName] = useState("")
    const [students, setStudents] = useState([{ id: "", name: "", email: "" }])
    const navigate = useNavigate()
    
    function handleStudentChange(index, field, value){
        const updated=[...students]
        updated[index][field]=value
        setStudents(updated)
    }
    function addStudentField(){
        setStudents([...students,{id:"",name:"",email:""}])
    }
    function removeStudentField(index){
        if(students.length > 1) {
            const updated = students.filter((_, i) => i !== index)
            setStudents(updated)
        }
    }
    
    async function handleSubmit(e){
        e.preventDefault()
        
        // Validate input
        if (!className.trim()) {
            Swal.fire({
                title: "Error!",
                text: "Please enter a class name",
                icon: "error"
            });
            return;
        }
        
        // Validate students data
        const validStudents = students.filter(student => 
            student.id.trim() && student.name.trim() && student.email.trim()
        );
        
        if (validStudents.length === 0) {
            Swal.fire({
                title: "Error!",
                text: "Please add at least one valid student with all fields filled",
                icon: "error"
            });
            return;
        }
        
        try{
            console.log("🔥 Attempting to add class to Firestore...");
            console.log("Class data:", { name: className, students: validStudents });
            
            const docRef = await addDoc(collection(db,"classes"),{
                name:className,
                students:validStudents,
                createdAt: new Date(),
                totalStudents: validStudents.length
            });
            
            console.log("✅ Class added successfully with ID:", docRef.id);
            
            Swal.fire({
                title: "Success!",
                text: `Class "${className}" with ${validStudents.length} students added successfully!`,
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
            
            // Reset form
            setClassName("");
            setStudents([{ id: "", name: "", email: "" }]);
            navigate("/")
        }
        catch(err){
            console.error("❌ Error adding class:", err);
            console.error("Error code:", err.code);
            console.error("Error message:", err.message);
            
            let errorMessage = "Failed to add class. ";
            if (err.code === 'permission-denied') {
                errorMessage += "Please check Firestore database rules.";
            } else if (err.code === 'unavailable') {
                errorMessage += "Database is currently unavailable.";
            } else {
                errorMessage += err.message;
            }
            
            Swal.fire({
                title: "Error!",
                text: errorMessage,
                icon: "error"
            });
        }
    }
    return (
        <div className='container-fluid px-4 py-4'>
            <div className='row justify-content-center'>
                <div className='col-12 col-lg-8'>
                    <div className="d-flex align-items-center mb-4">
                        <button 
                            className="btn btn-outline-primary me-3"
                            onClick={() => navigate('/')}
                        >
                            <i className="fas fa-arrow-left me-2"></i>Back
                        </button>
                        <div>
                            <h1 className='display-6 fw-bold text-primary mb-1'>
                                <i className="fas fa-plus-circle me-2"></i>Create New Class
                            </h1>
                            <p className="text-muted">Add a new class and enroll students</p>
                        </div>
                    </div>

                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                {/* Class Name Section */}
                                <div className='mb-4'>
                                    <div className="d-flex align-items-center mb-3">
                                        <i className="fas fa-chalkboard text-primary me-2"></i>
                                        <h5 className="mb-0 fw-bold">Class Information</h5>
                                    </div>
                                    <label className="form-label fw-semibold">Class Name *</label>
                                    <input 
                                        className="form-control form-control-lg" 
                                        type="text" 
                                        placeholder='Enter class name (e.g., Computer Science A, Mathematics 101)'
                                        required
                                        value={className}
                                        onChange={(e)=>setClassName(e.target.value)}
                                    />
                                </div>

                                {/* Students Section */}
                                <div className="mb-4">
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <div className="d-flex align-items-center">
                                            <i className="fas fa-users text-success me-2"></i>
                                            <h5 className="mb-0 fw-bold">Students ({students.length})</h5>
                                        </div>
                                        <button 
                                            type="button"
                                            className='btn btn-success btn-sm'
                                            onClick={addStudentField}
                                        >
                                            <i className="fas fa-user-plus me-1"></i>Add Student
                                        </button>
                                    </div>

                                    <div className="students-container">
                                        {students.map((student, index) => (
                                            <div className='student-card card mb-3 border-0 bg-light' key={index}>
                                                <div className="card-body p-3">
                                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                                        <small className="text-muted fw-semibold">Student #{index + 1}</small>
                                                        {students.length > 1 && (
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-danger btn-sm"
                                                                onClick={() => removeStudentField(index)}
                                                                title="Remove student"
                                                            >
                                                                <i className="fas fa-trash"></i>
                                                            </button>
                                                        )}
                                                    </div>
                                                    
                                                    <div className='row g-3'>
                                                        <div className="col-12 col-md-4">
                                                            <label className="form-label text-muted small">Student ID *</label>
                                                            <input 
                                                                type="text" 
                                                                className='form-control'
                                                                placeholder='e.g., CS001'
                                                                value={student.id}
                                                                onChange={(e)=>handleStudentChange(index, "id",e.target.value )}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="col-12 col-md-4">
                                                            <label className="form-label text-muted small">Full Name *</label>
                                                            <input 
                                                                type="text" 
                                                                className='form-control'
                                                                placeholder='e.g., John Doe'
                                                                value={student.name}
                                                                onChange={(e)=>handleStudentChange(index, "name",e.target.value )}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="col-12 col-md-4">
                                                            <label className="form-label text-muted small">Email Address *</label>
                                                            <input 
                                                                type="email" 
                                                                className='form-control'
                                                                placeholder='e.g., john@example.com'
                                                                value={student.email}
                                                                onChange={(e)=>handleStudentChange(index, "email",e.target.value )}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="d-flex gap-3 pt-3 border-top">
                                    <button 
                                        type="button"
                                        className='btn btn-outline-secondary flex-fill'
                                        onClick={() => {
                                            setClassName("");
                                            setStudents([{ id: "", name: "", email: "" }]);
                                        }}
                                    >
                                        <i className="fas fa-undo me-2"></i>Reset Form
                                    </button>
                                    <button 
                                        type="submit" 
                                        className='btn btn-primary flex-fill btn-lg'
                                    >
                                        <i className="fas fa-save me-2"></i>Create Class
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

