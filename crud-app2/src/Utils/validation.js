

export const validateForm = (name,email) => {
    if (name.trim() === ""){
     return "Name is required";
    }
    if (email.trim() === ""){
        return "Email is required";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)){
        return "Please enter a valid email";
    }
    return "";
};