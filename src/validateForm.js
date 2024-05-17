export function validateForm(formData,Employees,currentUser) {
    const newErrors = {};

    const duplicateUsername = Employees.find(user => user.username === formData.username && user.id !== currentUser?.id);
    const duplicateEmail = Employees.find(user => user.email === formData.email && user.id !== currentUser?.id);
    
    if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
    }
    if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
    }
    if(duplicateUsername){
        newErrors.username ="Username already exist";
    }
    if (!formData.password.trim()) {
        newErrors.password = 'Password is required';
    }
    if (!formData.phone.trim() || !/^[0-9]{10}$/.test(formData.phone)) {
        newErrors.phone = 'Invalid mobile number (10 digits)';
    }
    if(duplicateEmail){
        newErrors.email = "Email address already used";
    }
    if (!formData.department.trim()) {
        newErrors.department = 'department is required';
    }
    if (!formData.jobTitle.trim()) {
        newErrors.jobTitle = 'jobTitle is required';
    }
    if (!formData.email.trim() || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
        newErrors.email = 'Invalid email address';
    }

    return newErrors;
}