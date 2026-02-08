export const roleRedirect = (role: string, navigate: any) => {
    switch (role) {
        case "SUPER_ADMIN":
            navigate("/super-admin");
            break;
        case "ADMIN":
            navigate("/admin");
            break;
        case "OFFICER":
            navigate("/officer");
            break;
        case "CUSTOMER_SERVICE":
            navigate("/customer");
            break;
        default:
            navigate("/login");
    }
}