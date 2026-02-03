export const setAuth=(token: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
};

export const clearAuth = () =>{
    localStorage.clear();
}

export const getRole = () => localStorage.getItem("role");
export const getToken = () => localStorage.getItem("token");