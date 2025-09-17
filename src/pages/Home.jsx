import { useEffect, useState } from 'react'
import { db } from '../services/firebase'
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Home() {
    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    
    useEffect(()=>{
        fetchClasses()
    },[])

    const fetchClasses = async ()=>{
        try{
            setLoading(true)
            console.log("🔥 Fetching classes from Firestore...");
            const classSnapshot= await getDocs(collection(db,"classes"))
            console.log("📊 Classes snapshot:", classSnapshot);
            
            const classList=classSnapshot.docs.map(doc=>({
                id:doc.id,
                ...doc.data()
            }))
            console.log("📋 Classes list:", classList);
            setClasses(classList)
            
            if (classList.length === 0) {
                console.log("ℹ️ No classes found. Add some classes first.");
            } else {
                console.log(`✅ Successfully loaded ${classList.length} classes`);
            }
        }
        catch(err){
            console.error("❌ Error fetching classes:", err);
            console.error("Error code:", err.code);
            console.error("Error message:", err.message);
            
            if (err.code === 'permission-denied') {
                console.error("🚫 Permission denied. Please check Firestore rules.");
            }
            
            Swal.fire({
                title: 'Error!',
                text: 'Failed to load classes. Please check console for details.',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
        finally {
            setLoading(false)
        }
    }

    function handleClassClick(classId){
        localStorage.setItem("selectedClassId",classId)
        navigate("/attendance")
    }

    const handleDeleteClass = async (classId, className, event) => {
        event.stopPropagation() // Prevent class click when delete button is clicked
        
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete "${className}" class? This action cannot be undone!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        })

        if (result.isConfirmed) {
            try {
                await deleteDoc(doc(db, "classes", classId))
                
                // Update local state to remove deleted class
                setClasses(prevClasses => prevClasses.filter(cls => cls.id !== classId))
                
                Swal.fire({
                    title: 'Deleted!',
                    text: `"${className}" class has been deleted successfully.`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
                
                console.log(`✅ Class "${className}" deleted successfully`)
            } catch (error) {
                console.error("❌ Error deleting class:", error);
                
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to delete class. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        }
    }
    return (
        <div className="container-fluid px-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="display-6 fw-bold text-primary mb-2">📚 Classrooms</h1>
                    <p className="text-muted">Manage your classes and track attendance</p>
                </div>
                <button 
                    className="btn btn-primary btn-lg shadow-sm"
                    onClick={() => navigate('/add-class')}
                >
                    <i className="fas fa-plus me-2"></i>Add New Class
                </button>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Loading classes...</p>
                </div>
            ) : classes.length === 0 ? (
                <div className="text-center py-5">
                    <div className="mb-4">
                        <i className="fas fa-chalkboard-teacher fa-5x text-muted"></i>
                    </div>
                    <h3 className="text-muted">No Classes Found</h3>
                    <p className="text-muted mb-4">Create your first class to get started with attendance tracking</p>
                    <button 
                        className="btn btn-primary btn-lg"
                        onClick={() => navigate('/add-class')}
                    >
                        <i className="fas fa-plus me-2"></i>Create First Class
                    </button>
                </div>
            ) : (
                <div className="row g-4">
                    {classes.map(cls => (
                        <div className='col-12 col-md-6 col-lg-4' key={cls.id}>
                            <div 
                                className='class-card card h-100 shadow-sm border-0'
                                onClick={() => handleClassClick(cls.id)}
                                style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                            >
                                <div className="card-body d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div className="class-icon">
                                            <i className="fas fa-chalkboard text-primary fa-2x"></i>
                                        </div>
                                        <button
                                            className="btn btn-outline-danger btn-sm delete-btn"
                                            onClick={(e) => handleDeleteClass(cls.id, cls.name, e)}
                                            title="Delete Class"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                    
                                    <h4 className='card-title text-dark fw-bold mb-2'>{cls.name}</h4>
                                    
                                    <div className="class-stats">
                                        <div className="d-flex align-items-center mb-2">
                                            <i className="fas fa-users text-success me-2"></i>
                                            <span className="text-muted">
                                                <strong>{cls.students?.length || 0}</strong> Students
                                            </span>
                                        </div>
                                        
                                        <div className="d-flex align-items-center">
                                            <i className="fas fa-calendar-check text-info me-2"></i>
                                            <span className="text-muted">Ready for attendance</span>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-auto pt-3">
                                        <div className="d-flex gap-2">
                                            <small className="badge bg-primary-subtle text-primary px-2 py-1">
                                                Mark Attendance
                                            </small>
                                            <small className="badge bg-success-subtle text-success px-2 py-1">
                                                View Records
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="card-footer bg-transparent border-0">
                                    <small className="text-muted">
                                        <i className="fas fa-clock me-1"></i>
                                        Click to manage attendance
                                    </small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
