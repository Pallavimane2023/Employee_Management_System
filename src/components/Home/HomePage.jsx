import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEmployees, deleteUser } from "../../store/api";
import { useNavigate, useLocation } from "react-router-dom";
import AlertDialog from '../AlertDialog/AlertDialog'
import ButtonAppBar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./home.css";



const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [empID, setEmpId] = useState();

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [dispatch]);
  const users = useSelector((state) => state.user.employees);
  console.log(users)
  const isLoading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.auth.error);
  const role = useSelector((state) => state.auth.role);
  console.log(role)
  const isAdmin = role === 'Admin' ? true : false;

  const handleAddNewUser = () => {
    navigate('/add-user')
  }

  // Handle delete button click
  const handleDelete = (empId) => {
    setEmpId(empId)
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    // Perform the delete operation
    empID && dispatch(deleteUser(empID));
    setIsDialogOpen(false);
    alert("User Deleted successfully!..")
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };
  const location = useLocation();
  // Check if the current path is the login page
  const isLoginPage = location.pathname === '/';
  return (
    <>
      {!isLoginPage && (<ButtonAppBar />)}
      <>
        <h2>Employee List</h2>

        {isAdmin && (
          <Button onClick={handleAddNewUser}>

            Add New Employee
          </Button>
        )}
        {isLoading && <p>Loading...</p>}

        {!isLoading && !error && (
          <>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow className="headerRow">
                    <TableCell className="tableHeader">Sr.</TableCell>
                    <TableCell className="tableHeader">Name</TableCell>
                    <TableCell className="tableHeader">Email</TableCell>
                    <TableCell className="tableHeader">Contact</TableCell>
                    <TableCell className="tableHeader">Job Title</TableCell>
                    <TableCell className="tableHeader">Department</TableCell>
                    <TableCell className="tableHeader"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((emp, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {emp?.name}
                      </TableCell>
                      <TableCell>{emp?.email}</TableCell>
                      <TableCell>{emp?.phone}</TableCell>
                      <TableCell>{emp?.jobTitle}</TableCell>
                      <TableCell>{emp?.department}</TableCell>
                      <TableCell>
                        <Button
                          className="addButtonWrapper"
                          variant="outlined"

                          disabled={role === "User"}
                          onClick={() => handleDelete(emp.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          className="addButtonWrapper"
                          variant="outlined"
                          style={{ marginLeft: "10px" }}
                          disabled={role === "User"}
                          onClick={() => {
                            if (role !== "User") {
                              navigate(`edit-user/${emp.id}`);

                            }
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                </TableBody>
              </Table>
            </TableContainer>

          </>
        )}
        <AlertDialog
          message="Are you sure you want to delete this employee?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          isOpen={isDialogOpen}
        />
      </>
    </>
  );
}

export default HomePage;