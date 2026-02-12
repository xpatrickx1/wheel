export interface WidgetSettings {
  color: string;
  autoOpenDelay: number;
  collectData: string;
  title: string;
  subtitle: string;
  successMessage: string;
  privacyUrl: string;
  phoneRegion: string;
  buttonText: string;
  callFilter: string;
  actionButton: string;
  bonuses: {
    value: string;
    is_participating: boolean;
  }[];
  integrations: {
    telegram: string;
    googleAnalytics: string;
  };
  code: string;
  link: string;
  position?: PositionSettings;
}

export interface PositionSettings {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
  offset: number;
}

export const defaultWidgetSettings: WidgetSettings = {
  color: "#4705fb",
  autoOpenDelay: 45,
  collectData: "tel",
  title: "Крутіть колесо!",
  subtitle: "Введіть свій номер телефона/email, чтобы выиграть",
  successMessage: "Вітаємо! Не пропустіть дзвінок, ми скоро звяжемось",
  privacyUrl: "https://test.ua/politics",
  phoneRegion: "Ukraine (+380)",
  buttonText: "Крутити!",
  callFilter: "Фільтр відключено",
  actionButton: "Кнопка відключена",
  bonuses: [
    { value: "Знижка 10%", is_participating: true },
    { value: "Безкоштовна доставка", is_participating: true },
    { value: "Подарунок", is_participating: true },
    { value: "Спробуйте ще", is_participating: true },
    { value: "Бонус 100 грн", is_participating: true },
    { value: "Спеціальна пропозиція", is_participating: true }
  ],
  integrations: {
    telegram: "",
    googleAnalytics: ""
  },
  position: {
    offset: -20,
    vertical: "bottom",
    horizontal: "left"
  },
  code: "",
  link: ""
};
