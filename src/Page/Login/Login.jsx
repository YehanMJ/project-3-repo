import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Typography, FormControlLabel, Checkbox, ToggleButtonGroup, ToggleButton } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import GoogleIcon from '@mui/icons-material/Google';
// import instance from '../../Service/AxiosOrder';
import { Link } from 'react-router-dom';
import coverImage from "../../assets/backgroundImage.png";
import "@fontsource/bebas-neue";
import Toggle from '../../Common/Components/Toggle/Toggle';
import instance from '../../Service/AxiosOrder';



export default function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState(''); // For register form
    const [toggleValue, setToggleValue] = React.useState('login');

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleToggleChange = (event, newValue) => {
        if (newValue !== null) {
            setToggleValue(newValue);
        }
    };
    const handleRegister = () => {
        console.log('Register:', { username, password, confirmPassword });
        if (password === confirmPassword) {
            instance.post('/register', {
                name: name,
                email: username,
                password: password
            })
                .then(function (response) {
                    console.log(response)
                    const data = response;

                    if (!response.ok) throw new Error(data.message || "Registration failed");

                    setToggleValue('login')
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            console.log("Passwords do not match.")
        }


    };

    const handleLogin = () => {
        instance.post('/login', {
            email: username,
            password: password
        })
            .then(function (response) {
                console.log(response)
                const token = response.data?.token;
                localStorage.setItem('token', token);
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <Box
            display={'flex'}
            sx={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFF',
                border: '3px solid white',
                borderRadius: '35px',
                flexDirection: 'row'
            }}
        >
            <Box sx={{
                flex: 1,
                background: `url(${coverImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                border: '2px solid white',
                borderTopLeftRadius: '35px',
                borderBottomLeftRadius: '35px'
            }}>

            </Box>
            <Box
                sx={{
                    flex: 1,
                    color: 'white',
                    height: '60%',
                    minWidth: '500px',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '50px'
                }}
            >
                <Box>
                    <ToggleButtonGroup
                        color="primary"
                        value={toggleValue}
                        exclusive
                        onChange={handleToggleChange}
                        aria-label="Login or Register"
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            // gap: '10px',
                        }}
                    >
                        <ToggleButton value="login" sx={{
                            minWidth: '117px',
                            fontFamily: 'bebas neue',
                            fontSize: '22px',
                            lineHeight: '100%',
                            color: 'black',
                            '&.MuiToggleButton-root': {
                                border: '1px solid #F2BA1D',
                                borderRadius: '27.5px 0 0 27.5px',
                                marginRight: '10px',
                            },
                            '&.Mui-selected': {
                                backgroundColor: '#F2BA1D',
                                color: 'white', // Change text color when selected
                            },
                            '&:hover': {
                                backgroundColor: '#F2BA1D',
                                color: 'white', // Change text color when hovered
                            },
                            '&.Mui-selected:hover': {
                                backgroundColor: '#F2BA1D',
                                color: 'white', // Change text color when selected and hovered
                            },
                        }}>
                            Login
                        </ToggleButton>
                        <ToggleButton value="register" sx={{
                            minWidth: '117px',
                            fontFamily: 'bebas neue',
                            fontSize: '22px',
                            color: 'black',
                            '&.MuiToggleButton-root': {
                                border: '1px solid #F2BA1D',
                                borderRadius: '0 27.5px 27.5px 0',
                                borderLeft: '1px solid #F2BA1D',
                            },
                            '&.Mui-selected': {
                                backgroundColor: '#F2BA1D',
                                color: 'white', // Change text color when selected
                            },
                            '&:hover': {
                                backgroundColor: '#F2BA1D',
                                color: 'white', // Change text color when hovered
                            },
                            '&.Mui-selected:hover': {
                                backgroundColor: '#F2BA1D',
                                color: 'white', // Change text color when selected and hovered
                            },
                        }}>
                            Register
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    marginLeft: '60px'
                }}>
                    <Box sx={{ color: 'black', fontFamily: 'bebas neue', fontWeight: '400', fontSize: '34px', lineHeight: '100%', letterSpacing: '0%' }}><h1>{toggleValue === 'login' ? 'Welcome Back' : 'Welcome'}</h1> </Box>
                    <Box sx={{ color: 'black', fontFamily: 'bebas neue', fontWeight: 'bold', fontSize: '14px' }}><h1>ACPT INSTITUTE</h1> </Box>
                </Box>


                {toggleValue === 'login' && (
                    <Stack spacing={3} sx={{ width: 500 }}>
                        <TextField
                            id="login-email"
                            label="Email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#F6F6F6',
                                    borderRadius: '10px',
                                    '& fieldset': {
                                        borderColor: '#F6F6F6',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#F6F6F6',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#F6F6F6',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'black',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'black',
                                    backgroundColor: '#F6F6F6'
                                },
                            }}
                        />
                        <FormControl variant="outlined" sx={{ width: '100%' }}>
                            <InputLabel htmlFor="login-password" sx={{ color: 'black' }}>Password</InputLabel>
                            <OutlinedInput
                                id="login-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{
                                    backgroundColor: '#F6F6F6',
                                    borderRadius: '10px',
                                    '& fieldset': {
                                        borderColor: '#F6F6F6',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#F6F6F6',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#F6F6F6',
                                    },
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'end'
                            }}>
                            <Button
                                onClick={handleLogin}
                                variant="outlined"
                                size="large"
                                sx={{
                                    width: '100px',
                                    border: '2px solid #F2BA1D',
                                    color: '#F2BA1D',
                                    fontFamily: 'bebas neue',
                                    fontWeight: '700',
                                    borderRadius: '27.5px',
                                    fontSize: '22px',
                                    '&:hover': {
                                        backgroundColor: '#F2BA1D',
                                        color: 'white',
                                    },
                                }}
                            >
                                Login
                            </Button>
                        </Box>

                    </Stack>
                )}

                {/* Register Form */}
                {toggleValue === 'register' && (
                    <Stack spacing={3} sx={{ width: 500 }}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Name"
                            multiline
                            maxRows={4}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#F6F6F6',
                                    borderRadius: '10px',
                                    '& fieldset': {
                                        borderColor: '#F6F6F6',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#F6F6F6',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#F6F6F6',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'black',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'black',
                                    backgroundColor: '#F6F6F6'
                                },
                            }}
                        />
                        <TextField
                            id="register-email"
                            label="Email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#F6F6F6',
                                    borderRadius: '10px',
                                    '& fieldset': {
                                        borderColor: '#F6F6F6',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#F6F6F6',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#F6F6F6',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'black',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'black',
                                    backgroundColor: '#F6F6F6'
                                },
                            }}
                        />
                        <TextField
                            id="register-password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#F6F6F6',
                                    borderRadius: '10px',
                                    '& fieldset': {
                                        borderColor: '#F6F6F6',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#F6F6F6',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#F6F6F6',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'black',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'black',
                                    backgroundColor: '#F6F6F6'
                                },
                            }}
                        />
                        <TextField
                            id="register-confirm-password"
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#F6F6F6',
                                    borderRadius: '10px',
                                    '& fieldset': {
                                        borderColor: '#F6F6F6',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#F6F6F6',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#F6F6F6',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'black',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'black',
                                    backgroundColor: '#F6F6F6'
                                },
                            }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'end'
                            }}>
                            <Button
                                onClick={handleRegister}
                                variant="outlined"
                                size="large"
                                sx={{
                                    border: '2px solid #F2BA1D',
                                    color: '#F2BA1D',
                                    fontFamily: 'bebas neue',
                                    fontWeight: '700',
                                    borderRadius: '27.5px',
                                    fontSize: '22px',
                                    '&:hover': {
                                        backgroundColor: '#F2BA1D',
                                        color: 'white',
                                    },
                                }}
                            >
                                Register
                            </Button>
                        </Box>

                    </Stack>
                )}
            </Box>
        </Box>
    );
}

