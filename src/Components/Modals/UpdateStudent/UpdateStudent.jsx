import React, { useEffect, useState } from "react";
import { Box, Button, Modal, TextField, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import instance from "../../../Service/AxiosOrder";

export default function UpdateStudent({ open, handleClose, studentData, handleUpdateSuccess }) {
    const [sName, setSName] = useState("");
    const [sAge, setSAge] = useState("");
    const [sAddress, setSAddress] = useState("");
    const [sContact, setSContact] = useState("");

    // Update state when studentData changes
    useEffect(() => {
        if (studentData) {
            setSName(studentData.student_name || "");
            setSAge(studentData.student_age || "");
            setSAddress(studentData.student_address || "");
            setSContact(studentData.student_contact || "");
        }
    }, [studentData]);

    const handleUpdate = () => {
        instance
            .put(`/student/update/${studentData.id}`, {
                student_name: sName,
                student_age: sAge,
                student_address: sAddress,
                student_contact: sContact,
            })
            .then((response) => {
                if (response.status === 200) {
                    window.alert("Student has been successfully updated!");
                    handleUpdateSuccess(); // Callback to refresh data
                    handleClose(); // Close the modal
                } else {
                    throw new Error("Failed to update student");
                }
            })
            .catch((error) => {
                window.alert(`Error: ${error.message}`);
            });
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="update-student-modal-title"
            aria-describedby="update-student-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "600px",
                    bgcolor: "white",
                    borderRadius: "10px",
                    boxShadow: 24,
                    p: 4,
                }}
            >
                {/* Modal Header */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <Typography
                        id="update-student-modal-title"
                        variant="h6"
                        sx={{
                            fontWeight: "bold",
                            fontFamily: "bebas neue",
                            fontSize: "24px",
                            color: "black",
                        }}
                    >
                        UPDATE STUDENT
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Input Fields */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "20px",
                        marginBottom: "20px",
                    }}
                >
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={sName}
                        onChange={(e) => setSName(e.target.value)}
                        fullWidth
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#F6F6F6",
                                borderRadius: "10px",
                            },
                        }}
                    />
                    <TextField
                        label="Address"
                        variant="outlined"
                        value={sAddress}
                        onChange={(e) => setSAddress(e.target.value)}
                        fullWidth
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#F6F6F6",
                                borderRadius: "10px",
                            },
                        }}
                    />
                    <TextField
                        label="Age"
                        variant="outlined"
                        value={sAge}
                        onChange={(e) => setSAge(e.target.value)}
                        fullWidth
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#F6F6F6",
                                borderRadius: "10px",
                            },
                        }}
                    />
                    <TextField
                        label="Contact"
                        variant="outlined"
                        value={sContact}
                        onChange={(e) => setSContact(e.target.value)}
                        fullWidth
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#F6F6F6",
                                borderRadius: "10px",
                            },
                        }}
                    />
                </Box>

                {/* Update Button */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <Button
                        onClick={handleUpdate}
                        variant="contained"
                        sx={{
                            backgroundColor: "#F2BA1D",
                            color: "black",
                            fontFamily: "bebas neue",
                            fontSize: "18px",
                            fontWeight: "bold",
                            borderRadius: "10px",
                            padding: "10px 20px",
                            "&:hover": {
                                backgroundColor: "#d9a017",
                            },
                        }}
                    >
                        UPDATE
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}