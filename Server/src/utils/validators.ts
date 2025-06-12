export const validateDoctorData = (data: any): string | null => {
    const { name, email, password, licenseNumber, specialization } = data;
  
    if (!name || !email || !password || !licenseNumber || !specialization) {
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
  