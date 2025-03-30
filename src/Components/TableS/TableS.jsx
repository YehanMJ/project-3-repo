import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useState } from "react";
import UpdateStudent from "../Modals/UpdateStudent/UpdateStudent";

export default function TableS(props) {
    const [students, setStudents] = [props.students]
    const [openUpdate, setOpenUpdate] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleEdit = (student) => {
        setSelectedStudent(student); // Set the selected student data
        setOpenUpdate(true); // Open the Update modal
    };
    const handleCloseUpdate = () => {
        setOpenUpdate(false); // Close the Update modal
        setSelectedStudent(null); // Clear the selected student data
    };

    const handleUpdateSuccess = () => {
        console.log("Student updated successfully!");
        // Refresh the student list or perform other actions
        setOpenUpdate(false);
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
                                        onClick={() => handleEdit(student)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(student.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {selectedStudent && (
                <UpdateStudent
                    open={openUpdate}
                    handleClose={handleCloseUpdate}
                    studentData={selectedStudent}
                    handleUpdateSuccess={handleUpdateSuccess}
                />
            )}
        </>



    )
}