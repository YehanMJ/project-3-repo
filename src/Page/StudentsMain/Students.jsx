import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import instance from "../../Service/AxiosOrder";
import TableS from "../../Components/TableS/TableS";
import StudentModal from "../../Components/Modals/StudentModal/StudentModal";

export default function Students() {
    const [students, setStudents] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalMode, setModalMode] = useState("add"); // "add" or "update"
    const [selectedStudent, setSelectedStudent] = useState(null);



    const fetchStudents = () => {
        instance
            .get("/student/getAll")
            .then((response) => {
                setStudents(response.data);
                console.log(response.data); 
            })
            .catch((error) => {
                console.error("Error fetching students:", error);
            });
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };
    const handleAddStudent = () => {
        setModalMode("add");
        setSelectedStudent(null);
        setOpenModal(true);
    };

    const handleEditStudent = (student) => {
        setModalMode("update");
        setSelectedStudent(student);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedStudent(null);
    };



    return (
        <Box
            sx={{
                height: '95vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px',
                position: 'relative',
            }}
        >
            {/* Top Section */}
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        marginLeft: '20px',
                        color: 'black',
                    }}
                >
                    My Student
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddStudent}
                    sx={{ marginRight: '20px' }}
                >
                    Add Student
                </Button>
            </Box>

            <TableS students={students} fetchStudents={fetchStudents} handleEditStudent={handleEditStudent} />

            {/* Bottom Section */}
            <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
                sx={{
                    alignSelf: 'flex-start',
                    marginLeft: '20px',
                    marginTop: '20px',
                }}
            >
                Log Out
            </Button>
            <StudentModal
                open={openModal}
                handleClose={handleCloseModal}
                mode={modalMode}
                studentData={selectedStudent}
                fetchStudents={fetchStudents}
            />

        </Box>
    );
}