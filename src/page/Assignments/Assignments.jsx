import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';
import Navbar from '../../components/Header/Navbar';
import Footer from '../Footer/Footer';
import AssignmentsCards from './AssignmentsCards';

const Assignments = () => {
    const loadedAssignments = useLoaderData();
    const [assignments, setAssignments] = useState(loadedAssignments);
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const { user } = useContext(AuthContext);
    const [rassignments, rsetAssignments] = useState([]);

    const url = `http://localhost:5000/assignment?email=${user?.email}`;

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => rsetAssignments(data))
            .catch((error) => console.error("Error fetching data: ", error));
    }, [url]);

    const handleRemove = (_id) => {
        const assignmentToDelete = assignments.find((assignment) => assignment._id === _id);

        if (assignmentToDelete && assignmentToDelete.creator === user?.email) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://localhost:5000/assignment/${_id}`, {
                        method: 'DELETE',
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.deletedCount > 0) {
                                Swal.fire('Deleted!', 'Your Assignment has been deleted.', 'success');
                                const remaining = rassignments.filter((assignment) => assignment._id !== _id);
                                rsetAssignments(remaining);
                            }
                        });
                }
            });
        } else {
            Swal.fire('Access Denied', 'You do not have permission to delete this assignment.', 'error');
        }
    }

    const filteredAssignments = assignments.filter((assignment) => {
        if (selectedDifficulty === 'all') {
            return true;
        } else {
            return assignment.assignmentLevel === selectedDifficulty;
        }
    });

    return (
        <div>
            <Navbar />
            <div className='max-w-[1300px] mx-auto'>
                <div className="text-center mt-4 flex justify-center gap-5">
                    <button onClick={() => setSelectedDifficulty('all')} className="btn">All Assignments</button>
                    <button onClick={() => setSelectedDifficulty('easy')} className="btn ">Easy Assignments</button>
                    <button onClick={() => setSelectedDifficulty('medium')} className="btn ">Medium Assignments</button>
                    <button onClick={() => setSelectedDifficulty('hard')} className="btn ">Hard Assignments</button>
                </div>
                {filteredAssignments.length > 0 ? (
                    <div className="flex justify-around py-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {filteredAssignments.map((assignment) => (
                                <AssignmentsCards
                                    key={assignment._id}
                                    assignment={assignment}
                                    assignments={assignments}
                                    setAssignments={setAssignments}
                                    handleRemove={handleRemove}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-center h-screen flex flex-col justify-center items-center">No Data found</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Assignments;
