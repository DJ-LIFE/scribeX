import { createContext, useState } from "react";

// Create context outside the component
interface Post {
  id: string | null;
  title: string;
  content: string;
}

interface AppContextType {
  isSigned: boolean;
  setIsSigned: React.Dispatch<React.SetStateAction<boolean>>;
  postId: Post | null;
  setPostId: React.Dispatch<React.SetStateAction<Post | null>>;
}

export const AppContext = createContext<AppContextType>({
  isSigned: false,
  setIsSigned: () => {},
  postId: null,
  setPostId: () => {}
});

import { ReactNode } from "react";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isSigned, setIsSigned] = useState(false);
  const [postId, setPostId] = useState<Post | null>(null);
  
  return (
    <AppContext.Provider value={{ isSigned, setIsSigned, postId, setPostId }}>
      {children}
    </AppContext.Provider>
  );
};
