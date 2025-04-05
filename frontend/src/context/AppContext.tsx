import { createContext, useState } from "react";

// Create context outside the component
interface AppContextType {
  isSigned: boolean;
  setIsSigned: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType>({
  isSigned: false,
  setIsSigned: () => {},
});

import { ReactNode } from "react";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isSigned, setIsSigned] = useState(false);

  return (
    <AppContext.Provider value={{ isSigned, setIsSigned }}>
      {children}
    </AppContext.Provider>
  );
};
