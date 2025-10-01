import React, { useRef, useState, useEffect } from 'react';

export function Wheeltest() {
  
    const prizes = [
        { text: "Бонус #1", color: "#de051e" },
        { text: "Бонус #2", color: "#f5a623" },
        { text: "Бонус #3", color: "#417505" },
        { text: "Бонус #4", color: "#4a90e2" },
        { text: "Бонус #5", color: "#9013fe" },
        { text: "Бонус #6", color: "#50e3c2" },
      ];

  const wheel = document.getElementById("wheel")
  console.log(wheel);
const sliceAngle = 360 / prizes.length;

prizes.forEach((prize, i) => {
  const slice = document.createElement("div");
  slice.className = "widget-wheel-slice";
  slice.style.background = prize.color;
  slice.style.transform = `rotate(${i * sliceAngle}deg) skewY(${90 - sliceAngle}deg)`;
  slice.innerHTML = `<span style="transform: skewY(-${90 - sliceAngle}deg) rotate(${sliceAngle / 2}deg)">
    ${prize.text}
  </span>`;
  wheel.appendChild(slice);
});

// Функція крутіння
function spin() {
  const randomIndex = Math.floor(Math.random() * prizes.length);
  const rotation = 360 * 5 + (360 / prizes.length) * randomIndex;
  wheel.style.transform = `rotate(-${rotation}deg)`;

  setTimeout(() => {
    alert("Випав приз: " + prizes[randomIndex].text);
  }, 4000);
}
  return (
    <div className="w-full">
      <div className="flex items-center relative min-h-screen w-full overflow-hidden bg-[#262635] max-w-[1000px] mx-auto">
        <div id="wheel"></div>  
        {/* Контейнер для колеса */}
        <div className="wheel-container relative w-fit w-[500px] max-w-[500px]">
          <div  className="widget-wheel-wrap" >
                  <div className="widget-wheel-center" ></div>
                  <div className="widget-wheel-arrow" ></div>
                  <div className="widget-wheel widget-wheel-wait" >
                      <div className="widget-wheel-inner" >
                          <div className="widget-wheel-part" >
                              <div className="widget-wheel-slice-1" >
                                  <span className="widget-wheel-text widget-wheel-text-1">
                                      <span>Бонус #1</span>
                                  </span>
                              </div>
                              <div className="widget-wheel-slice-2" >
                                  <span className="widget-wheel-text widget-wheel-text-2">
                                      <span>Бонус #2</span>
                                  </span>
                              </div>
                              <div className="widget-wheel-slice-3" >
                                  <span className="widget-wheel-text widget-wheel-text-3">
                                      <span>якукякп</span>
                                  </span>
                              </div>
                              <div className="widget-wheel-slice-4" >
                                  <span className="widget-wheel-text widget-wheel-text-4">
                                      <span>якпукп</span>
                                  </span>
                              </div>
                          </div>
                          <div className="widget-wheel-part" >
                              <div className="widget-wheel-slice-5" >
                                  <span className="widget-wheel-text widget-wheel-text-5">
                                      <span>Бонус #1</span>
                                  </span>
                              </div>
                              <div className="widget-wheel-slice-6" >
                                  <span className="widget-wheel-text widget-wheel-text-6">
                                      <span>Бонус #2</span>
                                  </span>
                              </div>
                              <div className="widget-wheel-slice-7" >
                                  <span className="widget-wheel-text widget-wheel-text-7">
                                      <span>якукякп</span>
                                  </span>
                              </div>
                              <div className="widget-wheel-slice-8" >
                                  <span className="widget-wheel-text widget-wheel-text-8">
                                      <span>якпукп</span>
                                  </span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
        </div>

        
      </div>
    </div>
  );
}