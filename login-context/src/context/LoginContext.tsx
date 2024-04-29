import { createContext, useContext, useState } from "react";

interface User {
    name: string;
    email: string;
}
interface LoginContextTypes {
  isLoggedIn: boolean;
  handleLogin: () => void;
  user?: User;
}

const LoginContext = createContext<LoginContextTypes | null>(null);

const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User| undefined>(undefined);

  const handleLogin = () => {
    if(!isLoggedIn) {
        const fetchedUser: User = { name: "Robin Singh", email: "test@gmail.com" };
        setUser(fetchedUser);
    } else {
        setUser(undefined)
    }
    setIsLoggedIn(!isLoggedIn);

  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, handleLogin , user}}>
      {children}
    </LoginContext.Provider>
  );
};

const useLogin = () : [boolean, () => void, User | undefined] => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  const { isLoggedIn, handleLogin , user} = context;
  return [isLoggedIn, handleLogin, user];
};

export { LoginProvider, useLogin };
