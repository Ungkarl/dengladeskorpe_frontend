import { useEffect, useState } from "react";

const usePageText = (pathname) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    switch (pathname) {
      case "/":
        setTitle("Velkommen til Den Glade Skorpe!");
        setText("Hos os handler det om den perfekte pizza med den sprødeste skorpe. Vi bruger kun de bedste råvarer til både klassiske favoritter og spændende specialiteter som 'Parma Drama' og 'Rabbit Royale'. Uanset om du er til en lille, personlig pizza eller en stor familiedeling, så finder du det hos os. Kom forbi og nyd en pizza lavet med kærlighed, eller bestil den, hent den og nyd den derhjemme!");
        break;

      case "/employees":
        setTitle("Personalet hos Den Glade Skorpe");
        setText("Hos Den Glade Skorpe har vi et dedikeret og venligt personale, der altid går den ekstra mil for at sikre, at kunderne får den bedste oplevelse. Teamet består af erfarne pizzabagere, der med passion tilbereder lækre pizzaer med friske råvarer.");
        break;
        case "/contact":
          setTitle("Har du spørgsmål eller ønsker du at bestille din favoritpizza?");
          setText("Udfyld formularen herunder, så vender vi hurtigt tilbage til dig. Vi glæder os til at høre fra dig!");
          break;
        case "/basket":
        setTitle("Bestilling");
        setText("");
        break;

      default:
        setTitle("");
        setText("");
        break;
    }
  }, [pathname]);

  // Returner begge værdier som et objekt
  return { title, text };
};

export default usePageText;
