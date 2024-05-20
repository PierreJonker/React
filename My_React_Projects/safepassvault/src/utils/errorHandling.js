export const handleError = (error, setError) => {
    console.log('Error:', error);
    setError('An error occurred. Please try again.');
  };
  
  export const validateEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password) => {
    // Basic password validation (at least 8 characters)
    return password.length >= 8;
  };