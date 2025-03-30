import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

export default function DelStudent({ open, handleClose, handleDelete }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="delete-student-modal-title"
            aria-describedby="delete-student-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "400px",
                    bgcolor: "red",
                    borderRadius: "10px",
                    boxShadow: 24,
                    p: 4,
                    textAlign: "center",
                }}
            >
                {/* Modal Title */}
                <Typography
                    id="delete-student-modal-title"
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        fontFamily: "bebas neue",
                        fontSize: "24px",
                        color: "white",
                        marginBottom: "20px",
                    }}
                >
                    DO YOU WANT DELETE
                </Typography>

                {/* Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        marginTop: "20px",
                    }}
                >
                    <Button
                        onClick={handleDelete}
                        variant="contained"
                        sx={{
                            backgroundColor: "white",
                            color: "red",
                            fontFamily: "bebas neue",
                            fontSize: "18px",
                            fontWeight: "bold",
                            borderRadius: "20px",
                            padding: "10px 20px",
                            "&:hover": {
                                backgroundColor: "#f5f5f5",
                            },
                        }}
                    >
                        YES
                    </Button>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        sx={{
                            backgroundColor: "white",
                            color: "black",
                            fontFamily: "bebas neue",
                            fontSize: "18px",
                            fontWeight: "bold",
                            borderRadius: "20px",
                            padding: "10px 20px",
                            "&:hover": {
                                backgroundColor: "#f5f5f5",
                            },
                        }}
                    >
                        NO
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}