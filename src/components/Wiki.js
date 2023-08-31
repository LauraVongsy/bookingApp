import React, { useContext, useEffect, useState } from "react";
import { Context } from "./Context";

function Wiki() {
  const { city } = useContext(Context);
  const [resume, setResume] = useState("");
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(
          `https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&titles=${city}&formatversion=2&rvprop=content&rvslots=*&origin=*`
        );
        const data = await response.json();
        const extractedResume = data.query.pages[0].extract;
        setResume(extractedResume);
      } catch (error) {
        console.error("Une erreur est survenue :", error);
      }
    };

    fetchResults();
  }, [city]);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: resume }} />
    </div>
  );
}

export default Wiki;
