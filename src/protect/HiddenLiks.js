import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../features/auth/authSlice/authSlice";

export const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <div>{children}</div>;
  } else {
    return null;
  }
};

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <div>{children}</div>;
  } else {
    return null;
  }
};
