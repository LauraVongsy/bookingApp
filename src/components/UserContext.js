import React, { useState, createContext, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [id, setId] = useLocalStorage("login");
  const [pass, setPass] = useLocalStorage("password");
  const [isLogged, setIsLogged] = useLocalStorage("isLogged", false);

  const fetchUserData = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/users");
      const userData = await response.json();
      setUsers(userData);
      console.log(userData);
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const isUserIncluded = (identifiant, password) => {
    const utilisateur = users.find(
      (user) => user.username === identifiant && user.password === password
    );

    if (utilisateur) {
      console.log("Utilisateur trouvé :", utilisateur);
      setUser(utilisateur);
      setId(identifiant);
      setPass(password);
      setIsLogged(true);
    } else {
      console.error("Identifiant ou mot de passe incorrect");
    }
  };

  const usersData = {
    users,
    fetchUserData,
    user,
    id,
    pass,
    isUserIncluded,
    isLogged,
  };

  return (
    <UserContext.Provider value={usersData}>{children}</UserContext.Provider>
  );
};
