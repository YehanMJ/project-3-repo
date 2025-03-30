import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import instance from "../../Service/AxiosOrder";
import TableS from "../../Components/TableS/TableS";
import AddStudent from "../../Components/Modals/AddStudent/AddStudent";

export default function Students() {
    const [students, setStudents] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);

    
    useEffect(() => {
        instance.get("/student/getAll")
            .then((response) => {
                setStudents(response.data); // Assuming the response contains the data
                console.log(response.data); // Log the data for debugging
            })
            .catch((error) => {
                console.error("Error fetching students:", error);
            });
    }, []); // Empty dependency array to run only once on component mount

    const handleEdit = (id) => {
        console.log("Edit student with ID:", id);
        // Add your edit logic here
    };

    const handleDelete = (id) => {
        console.log("Delete student with ID:", id);
        // Add your delete logic here
    };

    const handleLogout = () => {
        console.log("Log Out button clicked");
        // Add your logout logic here
    };
    const handleAddStudent = () => setOpenAdd(true);
    const handleCloseADD = () => setOpenAdd(false);

    
    
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

            <TableS students={students}/>

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
            <AddStudent open={openAdd} handleClose={handleCloseADD} />
            
        </Box>
    );
}