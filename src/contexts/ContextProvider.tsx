import { createContext, useState } from 'react';
import { toast } from 'react-hot-toast';

import { GetAdminByEmailQuery } from '../graphql/generated';

type User = {
  name?: string;
  email?: string;
  photoUrl?: string;
}

type AppContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isActiveMenu: boolean;
  setIsActiveMenu: React.Dispatch<React.SetStateAction<boolean>>;
  signIn: (data: GetAdminByEmailQuery | undefined, password: string) => void;
  logout: () => void;
}

type ChildrenProps = {
  children: React.ReactNode;
}

export const AppContext = createContext({} as AppContextType);

export function AppProvider({ children }: ChildrenProps) {
  const [user, setUser] = useState<User | null>(() => 
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null
  );

  const [isActiveMenu, setIsActiveMenu] = useState(false);

  async function signIn(data: GetAdminByEmailQuery | undefined, password: string) {
    const isUserValid = !!data;

    if (!isUserValid) {
      alert("Usuário não encontrado!");

      return;
    }

    if (password === data.admin?.password) {
      localStorage.setItem("user", JSON.stringify({
        id: data.admin.id,
        name: data.admin.name,
        email: data.admin.email,
        password: undefined,
        photoUrl: data.admin.photoUrl
      }));

      setUser({
        name: data.admin?.name,
        email: data.admin?.email,
        photoUrl: data.admin?.photoUrl?.url,
      });

      toast.success("Logado com sucesso!", {
        position: 'bottom-center',
      });
    } else {
      toast.error("Email ou senha está incorreto", {
        position: 'bottom-center',
      });
    }
  }

  async function logout() {
    setUser(null);
    localStorage.removeItem("user");

    toast.success("Saiu com sucesso!", {
      position: 'bottom-center',
    });
  }
  
  return (
    <AppContext.Provider value={{ isActiveMenu, setIsActiveMenu, user, setUser, signIn, logout }}>
      {children}
    </AppContext.Provider>
  )
}
