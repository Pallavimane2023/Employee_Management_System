// vendor
import React, { useState } from 'react';
import { useNavigate, useParams ,useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { updateUser,addNewUser } from '../../store/api';
import {validateForm } from '../../validateForm';

import VisibilityIcon from '@mui/icons-material/Visibility';
import { FormControl, TextField, FormGroup, FormLabel, Select,InputAdornment,IconButton,Button, MenuItem } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './updateEmp.css'
import ButtonAppBar from '../Navbar/Navbar';

export const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const Employees = useSelector((state) => state.user.employees);
    const currentUser = useSelector((state) =>
        state.user.employees.find(user => user.id === id)
    );
    
    // Initialize form data with current user data
    const [formData, setFormData] = useState({
        id: currentUser?.id ?? Employees.length,
        name: currentUser?.name ?? '',
        username: currentUser?.username ?? '',
        password: currentUser?.password ?? '',
        phone: currentUser?.phone ?? '',
        jobTitle: currentUser?.jobTitle ?? '',
        email: currentUser?.email ?? '',
        role: currentUser?.role ?? 'User',
        department: currentUser?.department ?? '',
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        //const currentUserId = id ? currentUser : null
        const formErrors = validateForm(formData,Employees,currentUser);
        const newErrors = { ...formErrors };

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
  
        if(currentUser){
            dispatch(updateUser(formData));
            alert('User updated successfully!');
            setFormData({});
        }
        else{           
            dispatch(addNewUser(formData));

        alert('User added successfully!');
        setFormData({});
        }
        

    

        navigate('/home');
    };

    const location = useLocation();
    // Check if the current path is the login page
    const isLoginPage = location.pathname === '/';

    
    return (
        <>
           {!isLoginPage && (<ButtonAppBar/>)}
        <div className='PageContainer'>
            <Button  onClick={() => navigate('/home')}>              
                Back
            </Button >
            <h2>{currentUser?"Edit Employee":"Add New Employee"}</h2>
            <FormControl>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <div>
                        <FormGroup className='formGroup'>
                            <FormLabel className='Label'>Name</FormLabel>
                            <TextField
                                name="name"
                                id="outlined-name-input"
                                placeholder="Enter full name"
                                type="text"
                                variant="outlined"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <p>{errors.name}</p>}
                            </FormGroup>
                        <FormGroup className='formGroup'>
                            <FormLabel className='Label'>Username</FormLabel>


                            <TextField
                                type="text"
                                name="username"
                                placeholder="Enter username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                fullWidth
                                style={{ width: 500 }}
                            />

                            {errors.username && <p>{errors.username}</p>}
                        </FormGroup>
                        <FormGroup className='formGroup'> 
                            <FormLabel className='Label'>Password</FormLabel>

                            <TextField
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                fullWidth
                                style={{ width: 500 }}
                                InputProps={{ 
                                // <-- This is where the toggle button is added.
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={()=>setShowPassword(!showPassword)}
                                        >
                                         {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon />}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                           

                            {errors.password && <p>{errors.password}</p>}
                        </FormGroup>
                        <FormGroup className='formGroup'>
                            <FormLabel className='Label'>Mobile</FormLabel>


                            <TextField
                                type="text"
                                name="phone"
                                placeholder="Enter phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />

                            {errors.phone && <p>{errors.phone}</p>}
                        </FormGroup>
                        <FormGroup className='formGroup'>
                            <FormLabel className='Label'>jobTitle</FormLabel>


                            <TextField
                                type="text"
                                name="jobTitle"
                                placeholder="Enter phone number"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                required
                            />

                            {errors.jobTitle && <p>{errors.jobTitle}</p>}
                        </FormGroup>
                        <FormGroup className='formGroup'> 
                            <FormLabel className='Label'>Email</FormLabel>

                            <TextField
                                type="email"
                                name="email"
                                placeholder="Enter email address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            {errors.email && <p>{errors.email}</p>}
                        </FormGroup>
                        <FormGroup className='formGroup'>
                            <FormLabel className='Label'>Department</FormLabel>


                            <TextField
                                type="text"
                                name="department"
                                placeholder="Enter department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            />

                            {errors.department && <p>{errors.department}</p>}
                        </FormGroup>
                        <FormGroup className='formGroup'> 
                            <FormLabel className='Label'> Role</FormLabel>
                            <Select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="User">User</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                            </Select>
                        </FormGroup>
                        <Button
                            variant="contained"
                            type="submit"
                            style={{marginLeft:"30%"}}

                        >{currentUser?"Update Employee":"Add New Employee"}
                        </Button>

                    </div>

                </form>
            </FormControl>
        </div>
        </>
    );
};

