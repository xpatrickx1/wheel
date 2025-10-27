import React, { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "../components/Header";

export function Pricing(theme: string) {
  const [isYearly, setIsYearly] = useState(true);

  const plans = [
    {
      name: "тест-драйв",
      price: 0,
      features: ["10 заявок", "1 виджет"],
      button: "",
    },
    {
      name: "стандарт",
      price: 390,
      features: ["100 заявок/мес.", "1 виджет"],
      button: "ОПЛАТИТЬ 4680 РУБ.",
    },
    {
      name: "эксперт",
      price: 790,
      features: ["∞ заявок", "∞ виджетов", "отключение формы"],
      button: "ОПЛАТИТЬ 9480 РУБ.",
    },
  ];

  return (
    <div className={` text-white w-full flex flex-col items-center py-16  
      ${theme === "dark" ?   "bg-[#0B0E16]" : "bg-[#FFFFFF]"}`
      }>
      <div >
        <label className="flex items-center gap-2 mb-12">
          <input type="checkbox" className="clip-rect-0 h-0 -m-px overflow-hidden absolute w-px" checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
          <span className={!isYearly ? "text-white" : "text-gray-400"}>на месяц</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-14 h-8 ${isYearly ? "bg-blue-600" : "bg-gray-700"} rounded-full transition-colors duration-300`}
          >
            <motion.div
              layout
              className={`absolute top-0.5 left-0.5 w-7 h-7 rounded-full bg-white`}
              animate={{ x: isYearly ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </button>
          <span className={isYearly ? "text-white" : "text-gray-400"}>на год</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={` rounded-2xl p-8 shadow-lg flex flex-col items-start
              ${theme === "dark" ?   "bg-[#121624]" : "bg-[#ececec]"}`}
          >
            <div className={`text-3xl font-bold mb-1
              ${theme === "dark" ? "text-gray-400" : "text-black"}`}>

              {isYearly && plan.price !== 0 ? plan.price / 2 : plan.price}

              <span className="text-gray-400"> ₴ </span>

              <span className={`text-base 
              ${theme === "dark" ? "text-gray-400" : "text-black"}`}> /мес</span>
            </div>
            <p className="text-gray-400 mb-4">{plan.name}</p>

            <hr className="border-gray-700 w-full mb-4" />

            <ul className="mb-6 space-y-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="text-sm font-medium text-gray-200">
                  <span className={`font-semibold
              ${theme === "dark" ? "text-gray-400" : "text-black"}`}>{feature}</span>
                </li>
              ))}
            </ul>

            {plan.button && (
              <button className="mt-auto bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold py-2 px-4 rounded-lg w-full">
                {isYearly
                  ? plan.button.replace(/(\d+)/, (m) => parseInt(m) / 2)
                  : plan.button}
              </button>
            )}
          </motion.div>
        ))}
      </div>
      
    </div>
  );
}
