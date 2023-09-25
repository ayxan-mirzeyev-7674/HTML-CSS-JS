import { useRef, useEffect, useState } from "react";
import "./App.css";

function App() {
  const video = useRef(null);
  const canvas = useRef(null);
  const [barcode, setBarcode] = useState(null);
  const [basket, setBasket] = useState([]);
  const [card, setCard] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);

  const openCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 640, height: 480, facingMode:"environment" } })
      .then((stream) => {
        video.current.srcObject = stream;
        video.current.play();

        const ctx = canvas.current.getContext("2d");
        const barcode = new window.BarcodeDetector({
          formats: ["ean_13", "code_128"],
        });

        setInterval(() => {
          canvas.current.width = video.current.videoWidth;
          canvas.current.height = video.current.videoHeight;
          ctx.drawImage(
            video.current,
            0,
            0,
            video.current.videoWidth,
            video.current.videoHeight
          );
          barcode
            .detect(canvas.current)
            .then(([data]) => {
              if (data) {
                if (data.format === "ean_13") {
                  console.log("Product");
                  setBarcode(data.rawValue);
                } else {
                  console.log("Card");
                  setCard(data.rawValue);
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }, 100);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (barcode) {
      fetch("http://localhost/barcode-php/api.php?barcode=" + barcode)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setBasket([...basket, data]);
          }
        });
    }
  }, [barcode]);

  useEffect(() => {
    if (card) {
      fetch("http://localhost/barcode-php/api.php?card=" + card)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setCurrentCard(data);
          }
        });
    }
  }, [card]);

  return (
    <>
      <button onClick={openCamera}>Open camera</button>
      {currentCard && 
        <p>{currentCard.market_name} Balans: {currentCard.balance}</p>
      }
      <div>
        <video ref={video} autoPlay muted hidden />
        <canvas ref={canvas} />
      </div>
      {barcode && <div>Bulunan barcode: {barcode}</div>}
      {basket &&
        basket.map((item) => (
          <div key={item.id}>
            {item.product}
            <br />
            {item.price} manat <br />
            <img src={item.image} style={{ width: 100, height: 100 }} />
          </div>
        ))}
    </>
  );
}

export default App;
