import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../App.css";

function Calendrier() {
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [reservedDateRanges, setReservedDateRanges] = useState([]);
  const [reservationCount, setReservationCount] = useState(0);

  useEffect(() => {
    const storedData = localStorage.getItem("reservedDateRanges");

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const parsedDateRanges = parsedData.map((range) => [
          new Date(range[0]),
          new Date(range[1]),
        ]);
        setReservedDateRanges(parsedDateRanges);
        setReservationCount(parsedData.length);
      } catch (error) {
        console.error(
          "Erreur lors de la lecture des données du Local Storage :",
          error
        );
        localStorage.removeItem("reservedDateRanges");
      }
    }
  }, []);

  //-------------------------------------------------------------------------------------------------------------------------------------------

  //la fonction isDayGrayedOut détermine si un jour spécifique devrait être désactivé (grisé) dans un calendrier en vérifiant s'il appartient à l'une des plages de dates réservées.
  const isDayGrayedOut = (day) => {
    const dayTimestamp = day.getTime(); // convertit la date du jour en timestamp
    return reservedDateRanges.some(
      (range) =>
        dayTimestamp >= range[0].getTime() && dayTimestamp <= range[1].getTime()
    );
  };

  //La fonction isDateInRanges est utilisée pour vérifier si une date donnée se trouve dans l'une des plages de dates spécifiées

  const isDateInRanges = (date, ranges) => {
    const dateTimestamp = date.getTime();
    return ranges.some(
      (range) =>
        dateTimestamp >= range[0].getTime() &&
        dateTimestamp <= range[1].getTime()
    );
  };

  const isReservedRangesIncluded = (date, ranges) => {
    const dateTimestamp = date.getTime();
    return ranges.some(
      (range) =>
        dateTimestamp <= range[0].getTime() &&
        dateTimestamp >= range[1].getTime()
    );
  };

  //En résumé, la fonction handleDateChange sert à gérer le changement de date en vérifiant si la nouvelle date sélectionnée coïncide avec l'une des dates déjà sélectionnées, et si oui, elle affiche une alerte.
  const handleDateChange = (date) => {
    const isAnyDaySelected = selectedDateRange.some((day) => {
      const dayTimestamp = day.getTime();
      return date.some((selectedDay) => selectedDay.getTime() === dayTimestamp);
    });

    if (isAnyDaySelected) {
      alert("Sélectionnez une autre date de réservation.");
      return;
    }
    const isAnyGrayedOut = date.some(isDayGrayedOut);

    if (isAnyGrayedOut) {
      alert("Sélectionnez une autre date de réservation.");
      return;
    }

    const isDateInReservedRanges = isDateInRanges(date[0], reservedDateRanges);

    if (isDateInReservedRanges) {
      alert(
        "Le jour spécifique est déjà inclus dans une plage de réservation."
      );
      return;
    }

    if (isReservedRangesIncluded) {
      alert("et coucou!!");
      return;
    }

    setSelectedDateRange(date);
  };

  const handleReserve = () => {
    if (selectedDateRange.length === 2) {
      const startDate = selectedDateRange[0];
      const endDate = selectedDateRange[1];

      // Générer la liste de dates entre startDate et endDate
      const generatedDateRange = [];
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        generatedDateRange.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Vérifier si toutes les dates générées sont réservées
      const areAllDatesReserved = generatedDateRange.every((selectedDay) =>
        isDateInRanges(selectedDay, reservedDateRanges)
      );

      if (areAllDatesReserved) {
        alert(
          "Impossible de réserver une plage qui contient des dates déjà réservées."
        );
        return;
      }

      const newReservedDateRanges = [
        ...reservedDateRanges,
        ...generatedDateRange,
      ];
      setReservedDateRanges(newReservedDateRanges);
      setSelectedDateRange([]);
      localStorage.setItem(
        "reservedDateRanges",
        JSON.stringify(newReservedDateRanges)
      );
      setReservationCount(reservationCount + generatedDateRange.length);
    }
  };

  const handleDeleteReservation = (index) => {
    const newReservedDateRanges = [...reservedDateRanges];
    newReservedDateRanges.splice(index, 1);
    setReservedDateRanges(newReservedDateRanges);
    localStorage.setItem(
      "reservedDateRanges",
      JSON.stringify(newReservedDateRanges)
    );
    setReservationCount(reservationCount - 1);
  };

  const tileClassName = ({ date }) => {
    let classNames = "";

    reservedDateRanges.forEach((range, index) => {
      if (date >= range[0] && date <= range[1]) {
        classNames += `reserved-range-${index} `;
      }
    });

    return classNames.trim();
  };

  return (
    <div>
      <h1>Sélection de plages de jours</h1>
      <p>
        {selectedDateRange.length === 2 ? (
          <>
            Date de réservation {reservationCount}:{" "}
            {selectedDateRange[0]?.toLocaleDateString()} -{" "}
            {selectedDateRange[1]?.toLocaleDateString()}
          </>
        ) : (
          "Sélectionnez une plage de dates"
        )}
      </p>

      <Calendar
        onChange={handleDateChange}
        selectRange={true}
        tileClassName={tileClassName}
        tileDisabled={({ date, view }) =>
          view === "month" && // Bloquer uniquement les cases jour
          reservedDateRanges.some(
            (reservedRange) =>
              date >= reservedRange[0] && date <= reservedRange[1]
          )
        }
        tileContent={({ date, view }) =>
          view === "month" && isDayGrayedOut(date) ? (
            <div className="grayed-out-day" />
          ) : null
        }
      />
      <button onClick={handleReserve}>Réserver</button>
      <div>
        {reservedDateRanges.map((range, index) => (
          <div key={index}>
            <p>
              {selectedDateRange.length === 2 ? (
                <>
                  Date de réservation {reservationCount}:{" "}
                  {selectedDateRange[0]?.toLocaleDateString()} -{" "}
                  {selectedDateRange[1]?.toLocaleDateString()}
                </>
              ) : (
                "Sélectionnez une plage de dates"
              )}
            </p>

            <button onClick={() => handleDeleteReservation(index)}>
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendrier;
