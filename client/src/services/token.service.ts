// Store authentication token and user role in localStorage
export const setAuth=(token: string, role: string) => {
    // Save the JWT token to localStorage
    localStorage.setItem("token", token);
    // Save the user's role to localStorage
    localStorage.setItem("role", role);
};

// Clear all authentication data from localStorage
export const clearAuth = () =>{
    // Remove all items from localStorage (used for logout)
    localStorage.clear();
}

// Retrieve the user's role from localStorage
export const getRole = () => localStorage.getItem("role");
// Retrieve the JWT token from localStorage
export const getToken = () => localStorage.getItem("token");