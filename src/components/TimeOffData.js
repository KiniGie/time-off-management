import React, { useContext, useEffect, useState } from "react";
import TimeOff from "./TimeOff";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/ContextProvider";

const TimeOffData = () => {
  const { timeOffs, role, isLoading } = useContext(Context); // is (isLoading), has to zawsze boolean lub f. zwracajace boolean!
  const navigate = useNavigate();
  const location = useLocation(); //obiekt dajacy dostep do url, wiemy gdzie jestesmy 
  const params = new URLSearchParams(location.search); // wyciagamy query paramy, czyli search, wszystko w url po "?"
  const page = parseInt(params.get("page") ?? "1", 10); //pobieramy parametr page, czyli np 2, paramy to kawalek tekstu z url czyli stringi, wez page, a jak go nie ma to 1, / jak nie ma danych w params.get"page" to "1" jest wartoscia domyslna
  const timeOffsPerPage = 2; // ile przypada timeoffow na strone

  const [timeOffsToDisplay, setTimeOffsToDisplay] = useState(timeOffs); // timeOffsToDisplay ->tablica wyswietlonych timeoffow mieszcaccych sie na danej stronie

  useEffect(() => {
    // jesli nie dlugosc tablicy jest rozna od 0
    // jesli nie tablica jest niepusta
    // jesli tablica jest pusta
    // if (!timeOffs.length) return; // ! jest operatorem logicznym tzn. operuje na wartosci typu boolean, jezeli operand nie jest typu boolean to nastepuje automatyczna kownersja typu, w tym przypadku z number w boolean. (przy wykrzykniku wszystko zamieni sie w boolean). 0 -> false, wszystkie inne liczby -> true (mam zero wierszy, to negacja robi true)

    /* REVERSE:
    
    const reversedTimeOffs = timeOffs.slice().reverse();

    const startIndex = (page - 1) * timeOffsPerPage;
    const endIndex = startIndex + timeOffsPerPage;
    const slicedTimeOffs = timeOffs.slice(startIndex, endIndex);

    setTimeOffsToDisplay(slicedTimeOffs); */
    const numberOfPages = Math.ceil(timeOffs.length / timeOffsPerPage)

    if (timeOffs.length /* != 0 */) {  // if spowodowal automatyczna konwersje typow z number w boolean
      if (!page || page > numberOfPages) {  // page to nr strony podanej w url 
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
        {isLoading ? (
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <div className="table-products">
            <div className="border2">
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
            </div>
          </div>
        )}
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
