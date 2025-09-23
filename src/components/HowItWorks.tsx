import React from 'react';
import { workflowSteps } from '../data/workflow';

export function HowItWorks() {
  return (
    <div className="box-border flex flex-wrap max-w-none w-full mx-auto px-[15px] md:max-w-[1140px]">
      <div className="relative box-border basis-0 grow max-w-full min-h-px w-full px-[15px]">
        <h3 className="text-2xl font-bold box-border leading-9 text-center mt-[100px] mb-2.5">Как это работает</h3>
        <div className="box-border mt-[30px] mb-[50px]">
          {workflowSteps.map((row, rowIndex) => (
            <div key={rowIndex} className="box-border block justify-between max-w-full text-center w-full mb-0 mx-auto md:flex md:max-w-[850px] md:text-left md:mb-10">
              {row.map((step) => (
                <div key={step.id} className="box-border max-w-full min-h-0 min-w-0 text-center w-full mb-5 mx-auto md:max-w-[350px] md:min-h-[274px] md:min-w-[auto] md:text-left md:mb-0 md:mx-0">
                  <div className={step.containerClass}>
                    <div className="box-border text-center md:text-left">
                      <div className="font-bold box-border text-center md:text-left">{step.title}</div>
                      <div className="box-border opacity-50 text-center mt-[5px] md:text-left">{step.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
