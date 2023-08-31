import { useEffect, useState } from "react";

function useLocalStorage(key, valeurParDefaut = null) {
  // Utilise le hook useState pour gérer l'état de la valeur
  const [valeur, setValeur] = useState(() => {
    try {
      // Tente de récupérer la valeur enregistrée dans le stockage local
      const sauvegarde = localStorage.getItem(key);
      // Si une valeur est trouvée, la parse en JSON et la renvoie
      if (sauvegarde !== null) {
        return JSON.parse(sauvegarde);
      }
      // Si aucune valeur n'est trouvée, renvoie la valeur par défaut
      return valeurParDefaut;
    } catch {
      // En cas d'erreur lors de l'analyse, renvoie la valeur par défaut
      return valeurParDefaut;
    }
  });

  // Utilise le hook useEffect pour mettre à jour le stockage local lorsque la valeur change
  useEffect(() => {
    // Convertit la valeur en format JSON
    const valeurEnJSON = JSON.stringify(valeur);
    // Enregistre la valeur dans le stockage local en utilisant la clé fournie
    localStorage.setItem(key, valeurEnJSON);
  }, [key, valeur]);

  // Renvoie la valeur et une fonction pour mettre à jour la valeur
  return [valeur, setValeur];
}
export default useLocalStorage;
