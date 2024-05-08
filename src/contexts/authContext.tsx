import { User } from "firebase/auth";
import { createContext, useContext, useState } from "react";

type AuthContextType = {
  user: User | null;
  setUser: (user: any) => void;
};
export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});
export const useAuthContext = () => {
  const { user, setUser } = useContext(AuthContext);
  return { user, setUser };
};
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
