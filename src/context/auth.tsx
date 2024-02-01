import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState, useContext } from "react";

const AuthContext = createContext<any>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a SettingsProvider");
  }
  return context;
};


export const AuthProvider = ({ children }: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://pakam-project-backend.vercel.app/v1/login",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        console.log("Logged in successfully");
        router.push("/assessment");

        localStorage.setItem("token", response.data.token);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error("Error:", error);
      return error?.response.status;
    }
  };

  const register = async (
    firstName: string,
    lastName: string,
    username: string,
    password: string
  ) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://pakam-project-backend.vercel.app/v1/register",
        {
          firstName,
          lastName,
          username,
          password,
        }
      );

      if (response.status === 201) {
        console.log("Registered successfully");
        setIsLoading(false);
        router.push("/login");
      }
    } catch (error: any) {
      console.error("Error:", error);
      return error?.response.status;
    }
  };

  const contextValue = {
    register,
    login,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
