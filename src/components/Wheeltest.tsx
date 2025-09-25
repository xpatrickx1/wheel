import React, { useRef, useState, useEffect } from 'react';

export function Wheeltest() {
  

  return (
    <div className="w-full">
      <div className="flex items-center relative min-h-screen w-full overflow-hidden bg-[#262635] max-w-[1000px] mx-auto">
        {/* Контейнер для колеса */}
        <div className="wheel-container relative w-fit w-[500px] max-w-[500px]">
          {/* <canvas ref={canvasRef} id="canvas" width="500" height="500"></canvas> */}
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