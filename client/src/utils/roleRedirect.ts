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
    // Server uses CUSTOMER_SERVICE for customer service role
    case "CUSTOMER_SERVICE":
      // Match the route defined in the router
      navigate("/CUSTOMER_SERVICE");
      break;
    default:
      navigate("/login");
  }
};
