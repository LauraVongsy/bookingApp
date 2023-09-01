import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isSameDay, addDays } from "date-fns";
import { UserContext } from "./UserContext";

export function Calendrier2() {
  const { id } = useContext(UserContext);

  const [selectedDates, setSelectedDates] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [reserved, setReserved] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const disabledDates = [
    new Date(),
    addDays(new Date(), 3),
    addDays(new Date(), 5),
  ];

  useEffect(() => {
    const storedReservations =
      JSON.parse(localStorage.getItem("reservations")) || [];
    setReservations(storedReservations);
  }, []);

  function isDateDisabled(date) {
    return disabledDates.some((dDate) => isSameDay(dDate, date));
  }

  function isDateReserved(date) {
    return reservations.some((reservation) => {
      return date >= reservation.startDate && date <= reservation.endDate;
    });
  }

  function isDateInRange(date, rangeStart, rangeEnd) {
    return date >= rangeStart && date <= rangeEnd;
  }

  function isRangeOverlapping(existingStart, existingEnd, newStart, newEnd) {
    return (
      isDateInRange(newStart, existingStart, existingEnd) ||
      isDateInRange(newEnd, existingStart, existingEnd) ||
      isDateInRange(existingStart, newStart, newEnd) ||
      isDateInRange(existingEnd, newStart, newEnd)
    );
  }

  function handleDateSelect(date) {
    if (selectedDates.length === 1 && date > selectedDates[0]) {
      const newRange = [selectedDates[0], date];
      setSelectedDates(newRange);
      setReserved(false);
      setErrorMessage("");
      setSuccessMessage("");
    } else {
      setSelectedDates([date]);
      setReserved(false);
      setErrorMessage("");
      setSuccessMessage("");
    }
  }

  function handleReservation() {
    if (selectedDates.length === 2) {
      const newReservation = {
        startDate: selectedDates[0],
        endDate: selectedDates[1],
        id: id,
      };

      const hasOverlappingReservation = reservations.some((reservation) =>
        isRangeOverlapping(
          reservation.startDate,
          reservation.endDate,
          newReservation.startDate,
          newReservation.endDate
        )
      );

      if (!hasOverlappingReservation) {
        const updatedReservations = [...reservations, newReservation];
        setReservations(updatedReservations);
        localStorage.setItem(
          "reservations",
          JSON.stringify(updatedReservations)
        );
        setSelectedDates([]);
        setReserved(true);
        setSuccessMessage("Votre réservation a bien été prise en compte!");
        setErrorMessage("");
      } else {
        setErrorMessage("Vous ne pouvez pas sélectionner ces dates.");
        setSuccessMessage("");
      }
    }
  }

  function tileClassName({ date }) {
    if (
      selectedDates.length === 2 &&
      date >= selectedDates[0] &&
      date <= selectedDates[1]
    ) {
      return "selected-range";
    }
    if (isDateDisabled(date)) {
      return "disabled";
    }
    if (isDateReserved(date)) {
      return "reserved";
    }
    return "";
  }

  return (
    <div>
      <Calendar
        selectRange={true}
        tileDisabled={({ date }) =>
          isDateDisabled(date) || isDateReserved(date)
        }
        tileClassName={tileClassName}
        onClickDay={handleDateSelect}
      />
      <div>
        {selectedDates.length === 2 ? (
          <div>
            Selected Range:{" "}
            {`${selectedDates[0].toLocaleDateString()} - ${selectedDates[1].toLocaleDateString()}`}
            <button onClick={handleReservation} disabled={reserved}>
              Réserver
            </button>
          </div>
        ) : (
          <div>Please select a valid date range</div>
        )}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}
