import React from 'react';
import { widgetTypes } from '../data/widgetTypes';

export function WidgetTypes() {
  return (
    <div className="box-border flex flex-wrap max-w-none w-full mx-auto px-[15px] md:max-w-[1140px]">
      {widgetTypes.map((widget) => (
        <div key={widget.id} className="relative box-border basis-full shrink-0 max-w-full min-h-px w-full px-[15px] md:basis-6/12 md:max-w-[50%]">
          <h3 className={widget.titleClass}>{widget.title}</h3>
          <p className="text-lg box-border leading-[27px] max-w-[360px] opacity-70 text-center mb-10 mx-auto">{widget.description}</p>
          <div className={widget.containerClass}>
            {widget.badge && (
              <span className="absolute text-sm font-bold bg-indigo-600 bg-[linear-gradient(rgb(87,46,253)_0%,rgb(51,57,255)_100%)] shadow-[rgba(43,62,229,0.15)_0px_15px_18px_0px,rgba(93,225,151,0.004)_0px_2px_0px_0px_inset] box-border block leading-[21px] px-[15px] py-[5px] rounded-[100px] right-5 top-5">{widget.badge}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
