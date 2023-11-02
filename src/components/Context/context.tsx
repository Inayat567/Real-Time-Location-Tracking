import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {LatLng} from 'react-native-maps';

export type ContextRouteProp = {
  arrivalTime: string;
  departureTime: string;
  carName: string;
  routeCoordinates: LatLng[];
};

export type AuthContextType = {
  routes: ContextRouteProp | null;
  setRoutes: Dispatch<SetStateAction<ContextRouteProp | null>>;
  liveRoutes: LatLng[];
  setLiveRoutes: Dispatch<SetStateAction<LatLng[]>>;
};

const AuthContext = createContext<AuthContextType>(null);

// function useAuth(): AuthContextType {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }

const AuthProvider = (props: {children: ReactNode}): ReactElement => {
  const [routes, setRoutes] = useState<ContextRouteProp | null>(null);
  const [liveRoutes, setLiveRoutes] = useState<LatLng[]>([]);

  return <AuthContext.Provider {...props} value={{routes, setRoutes, liveRoutes, setLiveRoutes}} />;
};

export {AuthProvider};
export default AuthContext;
