import React, { createContext, useContext, useReducer } from "react";

//Prepare the data layer
export const StateContext = createContext();

//wrap out app and provide the data layer
export const StateProvider = ({ reducer, initalState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initalState)}>
    {children}
  </StateContext.Provider>
);

//pull info from the data layer
export const useStateValue = () => useContext(StateContext);
