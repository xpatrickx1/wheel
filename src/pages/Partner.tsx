import React, { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "../components/Header";

export default function Partner() {
  const [stats, setStats] = useState({
    registrations: 0,
    payments: 0,
    balance: 0,
    });
    
    
    const rewards = [
    { label: "Тариф стандарт (месяц)", amount: "198 руб." },
    { label: "Тариф эксперт (месяц)", amount: "338 руб." },
    { label: "Тариф стандарт (год)", amount: "936 руб." },
    { label: "Тариф эксперт (год)", amount: "1896 руб." },
    ];
    
    
    return (
      <>
        <Header />
        <section className="min-h-screen bg-[#0B0E16] text-white flex flex-col items-center py-16 px-4 pt-[10rem]">
        {/* Header Section */}
          <h1 className="text-3xl font-bold mb-4">Партнёрская программа</h1>
          <p className="text-gray-400 text-center max-w-2xl mb-8">
            Помогите узнать о сервисе другим предпринимателям и зарабатывайте от 20% с каждой оплаты. Процент выплат увеличится, если сможете показать объем.
          </p>
          
        
          {/* Referral Link */}
          <div className="bg-[#121624] rounded-xl w-full max-w-md p-4 mb-6 text-center text-blue-400 font-semibold select-all">
            lp9.ru/r/pysuvo53
          </div>
          
          
          {/* Stats */}
          <div className="text-gray-300 text-center space-y-1 mb-6">
            <p>Регистраций — {stats.registrations}</p>
            <p>Оплат — {stats.payments}</p>
            <p>Баланс — {stats.balance} руб.</p>
          </div>
          
          
          {/* Payout Button */}
          <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-2 px-6 rounded-lg text-sm">
            ЗАПРОСИТЬ ВЫПЛАТУ
          </button>
          
          
          {/* Rewards Section */}
          <div className="text-center mt-16">
            <h2 className="text-2xl font-semibold mb-4">Вознаграждения</h2>
            <div className="space-y-2 text-gray-300">
              {rewards.map((reward, i) => (
                <p key={i}>
                  {reward.label} — <span className="text-white">{reward.amount}</span>
                </p>
              ))}
            </div>
          </div>
        </section>
      </>
    );
}
