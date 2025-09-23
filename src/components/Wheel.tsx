import React, { useState, useEffect, useRef } from 'react';
import Winwheel from '../lib/Winwheel';

export function Wheel() {
  // const [isWheelOpen, setIsWheelOpen] = useState(false);
  const canvasRef = useRef(null);
  let theWheel = null as Winwheel | null;

  // useEffect(() => {
  //   if (isWheelOpen && canvasRef.current) {
      theWheel = new Winwheel({
        'numSegments': 8,
        'outerRadius': 212,
        'innerRadius': 50,
        'textFontSize': 16,
        'textMargin': 0,
        'segments': [
          {'fillStyle': '#242ef2', 'text': 'Prize 1'},
          {'fillStyle': '#1121e8', 'text': 'Prize 2'},
          {'fillStyle': '#242ef2', 'text': 'Prize 3'},
          {'fillStyle': '#1121e8', 'text': 'Prize 4'},
          {'fillStyle': '#242ef2', 'text': 'Prize 5'},
          {'fillStyle': '#1121e8', 'text': 'Prize 6'},
          {'fillStyle': '#242ef2', 'text': 'Prize 7'},
          {'fillStyle': '#1121e8', 'text': 'Prize 8'},
        ],
        'animation': {
          'type': 'spinToStop',
          'duration': 5,
          'spins': 8,
          'callbackFinished': alertPrize,
        },
      });

      theWheel.canvas = canvasRef.current;
      theWheel.draw();
  //   }
  // }, [isWheelOpen]);

  // Called when the animation has finished.
  function alertPrize(indicatedSegment) {
    alert("You have won " + indicatedSegment.text);
  }

  function startSpin() {
    if (theWheel) {
      theWheel.startAnimation();
    }
  }

  // function handleOpenWheel() {
  //   setIsWheelOpen(true);
  // }

  // function handleCloseWheel() {
  //   setIsWheelOpen(false);
  //   if (theWheel) {
  //     theWheel.stopAnimation(false); // Зупиняємо анімацію при закритті
  //     theWheel.draw(); // Перемальовуємо колесо в початковому стані
  //   }
  // }

  return (
    <div className="relative min-h-screen">
      {/* Кнопка для відкриття колеса */}
      {/* <button
        onClick={handleOpenWheel}
        className="fixed top-4 right-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full z-10"
      >
        Open Wheel
      </button> */}

      {/* Панель з колесом фортуни */}
      {/* <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isWheelOpen ? '-translate-x-0' : '-translate-x-full'
        } w-96 z-20`}
      >
        <div className="p-4"> */}
          {/* Кнопка закриття */}
          {/* <button
            onClick={handleCloseWheel}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <span className="text-2xl">&times;</span>
          </button> */}

          {/* Контейнер для колеса */}
          <div className="wheel-container relative w-full mx-auto">
            <canvas ref={canvasRef} id="canvas" width="434" height="434"></canvas>
            <div className="wheel-arrow absolute top-1/2 -translate-y-1/2 -right-4"></div>
          </div>

          {/* Кнопка Spin */}
          <button
            id="spin_button"
            onClick={startSpin}
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full w-full"
          >
            Spin
          </button>

          {/* Форма */}
          <form className="mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Submit
            </button>
          </form>
        {/* </div> */}
      {/* </div> */}

      {/* Накладка для закриття при кліку поза панеллю (опціонально) */}
      {/* {isWheelOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={handleCloseWheel}
        ></div>
      )} */}
    </div>
  );
}