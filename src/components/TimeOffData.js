import React, { useContext, useEffect, useState } from "react";
import TimeOff from "./TimeOff";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/ContextProvider";

const TimeOffData = () => {
  const { timeOffs, role } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation(); //obiekt dajacy dostep do url
  const params = new URLSearchParams(location.search); // wyciagamy query paramy, czyli search, wszystko w url po "?"
  const page = parseInt(params.get("page") ?? "1"); //pobieramy parametr page, czyli np 2, paramy to kawalek tekstu z url czyli stringi, wez page, a jak go nie ma to 1
  const timeOffsPerPage = 2; // ile przypada timeoffow na strone

  const [timeOffsToDisplay, setTimeOffsToDisplay] = useState(timeOffs); // timeOffsToDisplay ->tablica wyswietlonych timeoffow mieszcaccych sie na danej stronie

  useEffect(() => {
    // jesli nie dlugosc tablicy jest rozna od 0
    // jesli nie tablica jest niepusta
    // jesli tablica jest pusta
    // if (!timeOffs.length) return; // ! jest operatorem logicznym tzn. operuje na wartosci typu boolean, jezeli operand nie jest typu boolean to nastepuje automatyczna kownersja typu, w tym przypadku z number w boolean. (przy wykrzykniku wszystko zamieni sie w boolean). 0 -> false, wszystkie inne liczby -> true (mam zero wierszy, to negacja robi true)
    if (timeOffs.length) {
      if (!page || Math.ceil(timeOffs.length / timeOffsPerPage) < page) {
        navigate("/panel?page=1"); // jak sie pierwszy raz wykonuje to dane z backendu nie przyszly jeszzce i dlatego wraca do strony pierwszej
      }
      setTimeOffsToDisplay(
        timeOffs.slice(
          (page - 1) * timeOffsPerPage,
          (page - 1) * timeOffsPerPage + timeOffsPerPage
        ) //timeoffy to tablica, ktora indeksujemy od 0, a strony,page od 1,
      );
    }
  }, [page, timeOffs]); // gdy zmieni sie page lub timeoffs to zmieniamy setTimetoDisplay, zmieniay, zeby na stronie wyswietlaly sie po 2, robimy to za kazdym razem jak zmieni sie page lub timeoffs
  return (
    <div className="table-container">
      <div className="time-off-requests label-text">
        <table className="table-products">
          <thead>
            <tr>
              <th>Time off type</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Status</th>
              {role === "admin"/*  && <th>Approve</th> */}
            </tr>
          </thead>
          <tbody>
            {timeOffsToDisplay.map((timeoff) => (
              <TimeOff // przekazujemy dane do komponentu
                key={timeoff.id}
                id={timeoff.id}
                timeOffType={timeoff.timeOffType}
                startDate={timeoff.startDate}
                endDate={timeoff.endDate}
                status={timeoff.status}
              />
            ))}
            {/* tu powstaje tablica dwoch komponentow timeoff, wpada w html */}
          </tbody>
        </table>
        <div className="link-box">
          {[...Array(Math.ceil(timeOffs.length / timeOffsPerPage))].map(
            (
              el,
              index // tworzona jest tablica undefindow, potem mapujemy (map z dwoma parametrami->pierwszy to element tablicy, drugi to index tego elementu w tablicy), 72 linia mowi, ze wykonujemy czynnosc 4 razy
            ) => (
              <Link
                key={index} // indexy zaczynaja sie od zera, a page musi zaczynac sie od 1, wiec dodajemy 1// key to html, {js}
                to={`/panel?page=${index + 1}`}
                style={
                  index + 1 === page
                    ? { color: "rgb(135, 24, 239)" }
                    : { color: "black" }
                }
              >
                {index + 1} {/* nawiasy, bo js */}
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeOffData;

//http://localhost:3000/panel?page=2 http -> protokół, //localhost -> host, nazwa domenowa (np google.com) lub IP, :3000 -> port (domyslnie 80 dla http, 443 dla https), /panel -> path, sciezka, page=2 -> query param (jesli jest wiele to sa oddzielane &), sposob zapisu danych w url
