import { useContext } from 'react';
import { AppContext } from '../contexts/ContextProvider';

export function useApplication() {
  const context = useContext(AppContext);

  return context;
}
