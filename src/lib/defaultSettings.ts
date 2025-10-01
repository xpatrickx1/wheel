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
}

export const defaultWidgetSettings: WidgetSettings = {
  color: "#4705fb",
  autoOpenDelay: 45,
  collectData: "tel",
  title: "Крутите колесо!",
  subtitle: "Введите свой номер телефона/email, чтобы выиграть",
  successMessage: "Поздравляем! Не пропустите звонок, мы скоро свяжемся",
  privacyUrl: "https://test.ua/politics",
  phoneRegion: "Ukraine (+380)",
  buttonText: "Крутить!",
  callFilter: "Фильтр отключен",
  actionButton: "Кнопка отключена",
  bonuses: [
    {
      value: "Бонус #1",
      is_participating: true
    }, {
      value: "Бонус #2",
      is_participating: true
    }, {
      value: "",
      is_participating: false
    }, {
      value: "",
      is_participating: false
    }, {
      value: "",
      is_participating: false
    }, {
      value: "",
      is_participating: false
    }, {
      value: "",
      is_participating: false
    }, {
      value: "",
      is_participating: false
    },
  ],
  integrations: {
    telegram: "",
    googleAnalytics: ""
  },
  code: "",
  link: ""
};
