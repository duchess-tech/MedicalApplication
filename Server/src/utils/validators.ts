export const validateDoctorData = (data: any): string | null => {
    const { firstname,lastname, email, password,gender,phone,licenseNumber, specialization } = data;
  
    if (!firstname ||!lastname || !email || !password || !licenseNumber || !specialization) {
      return "All fields are required";
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
  
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
  
    return null;
  };
  
  export const validatePatientData = (data: any): string | null => {
    const { firstname,lastname, email, password, age, gender, phone } = data;
  
    if (!firstname ||!lastname || !email || !password || !age || !gender || !phone) {
      return "All patient fields are required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
  
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
  
    if (isNaN(age) || age < 0 || age > 60) {
      return "Age must be a valid number between 0 and 120";
    }
  
    if (!['male', 'female', 'other'].includes(gender.toLowerCase())) {
      return "Gender must be male, female, or other";
    }
    const phoneNoRegex=/^[0-9]{10,15}$/
  
    if (!phoneNoRegex.test(phone)) {
      return "Phone number must be 10–15 digits";
    }
  
    return null;
  }