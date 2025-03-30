import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useState } from "react";
import DelStudent from "../Modals/DeleteStudent/DelStudent";
import instance from "../../Service/AxiosOrder";

export default function TableS({ students, fetchStudents, handleEditStudent }) {
    const [openDelete, setOpenDelete] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    const handleDeleteClick = (studentId) => {
        setStudentToDelete(studentId); // Set the student ID to delete
        setOpenDelete(true); // Open the Delete modal
    };

    const handleCloseDelete = () => {
        setOpenDelete(false); // Close the Delete modal
        setStudentToDelete(null); // Clear the student ID
    };

    const handleDeleteConfirm = () => {
        instance
            .delete(`/student/delete/${studentToDelete}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log("Student deleted successfully!");
                    fetchStudents(); // Refresh the student list
                    setOpenDelete(false); // Close the Delete modal
                    setStudentToDelete(null); // Clear the student ID
                } else {
                    console.error("Failed to delete student");
                }
            })
            .catch((error) => {
                console.error("Error deleting student:", error.message);
            });
    };
    return (
        <>
            <TableContainer
                component={Paper}
                sx={{
                    maxHeight: '60vh',
                    overflowY: 'auto',
                    width: '80%',
                    border: '2px solid black',
                    borderRadius: '20px',
                    padding: '25px',
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow

                        >
                            <TableCell
                                sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    backgroundColor: 'black',
                                    borderTopLeftRadius: '10px',
                                    borderBottomLeftRadius: '10px',
                                }}
                            ><strong>Name</strong></TableCell>
                            <TableCell
                                sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    backgroundColor: 'black'
                                }}
                            ><strong>Age</strong></TableCell>
                            <TableCell
                                sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    backgroundColor: 'black'
                                }}
                            ><strong>Address</strong></TableCell>
                            <TableCell
                                sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    backgroundColor: 'black'
                                }}
                            ><strong>Contact</strong></TableCell>
                            <TableCell
                                sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    backgroundColor: 'black',
                                    borderTopRightRadius: '10px',
                                    borderBottomRightRadius: '10px',
                                }}
                            ><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    sx={{
                                        borderBottom: '1px solid #F2BA1D', // Set bottom border color
                                    }}>{student.student_name}</TableCell>
                                <TableCell
                                    sx={{
                                        borderBottom: '1px solid #F2BA1D', // Set bottom border color
                                    }}>{student.student_age}</TableCell>
                                <TableCell
                                    sx={{
                                        borderBottom: '1px solid #F2BA1D', // Set bottom border color
                                    }}>{student.student_address}</TableCell>
                                <TableCell
                                    sx={{
                                        borderBottom: '1px solid #F2BA1D', // Set bottom border color
                                    }}>{student.student_contact}</TableCell>
                                <TableCell
                                    sx={{
                                        borderBottom: '1px solid #F2BA1D', // Set bottom border color
                                    }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        sx={{ marginRight: '10px' }}
                                        onClick={() => handleEditStudent(student)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDeleteClick(student.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {openDelete && (
                <DelStudent
                    open={openDelete}
                    handleClose={handleCloseDelete}
                    handleDelete={handleDeleteConfirm}
                />
            )}
        </>



    )
}