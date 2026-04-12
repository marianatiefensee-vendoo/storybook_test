import { createContext, useContext } from 'react';

export type NavigationRailContextValue = {
  expanded: boolean;
};

export const NavigationRailContext = createContext<NavigationRailContextValue>({
  expanded: true,
});

export function useNavigationRailContext() {
  return useContext(NavigationRailContext);
}
