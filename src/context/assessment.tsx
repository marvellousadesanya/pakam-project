import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState, useContext } from "react";

const AssessmentContext = createContext<any>(null);

export const useAuthContext = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error(
      "useAssessmentContext must be used within a AssessmentProvider"
    );
  }
  return context;
};

export const AssessmentProvider = ({ children }: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [assessments, setAssessments] = useState([]);

  const fetchAssessments = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://pakam-project-backend.vercel.app/v1/assessments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAssessments(response.data.assessments);

      if (response.status === 200) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const contextValue = {
    assessments,
    fetchAssessments,
    isLoading,
  };

  return (
    <AssessmentContext.Provider value={contextValue}>
      {children}
    </AssessmentContext.Provider>
  );
};

export function useAssessment() {
  return useContext(AssessmentContext);
}
