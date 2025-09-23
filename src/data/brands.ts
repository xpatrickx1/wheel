export interface Brand {
    readonly id: string;
    readonly description: string;
    readonly image?: string;
    readonly imageClass?: string;
  }
  
  export const brandCases: Brand[][] = [
    [
      {
        id: 'yandex',
        description: 'Яндекс разыгрывал подписки на Яндекс.Плюс внутри своей экосистемы приложений через колесо фортуны lp9.ru',
        image: "https://c.animaapp.com/mdsj6ig00k4ngn/assets/logo-yandex.svg",
        imageClass: "box-border w-[140px] mb-5"
      },
      {
        id: 'myata',
        description: 'Мята Lounge стабильно получают заявки\nблагодаря виджету',
        image: "https://c.animaapp.com/mdsj6ig00k4ngn/assets/logo-myata.svg",
        imageClass: "box-border w-[70px] mb-5"
      },
      {
        id: 'dashkiev',
        description: 'Проект Михаила Дашкиева — сооснователя Бизнес-Молодости. Используют виджет на образовательной платформе.',
        image: "https://c.animaapp.com/mdsj6ig00k4ngn/assets/logo-units.png",
        imageClass: "box-border w-[110px] mb-5"
      }
    ],
    [
      {
        id: 'mts',
        description: 'МТС Касса использует колесо фортуны для розыгрыша бонусов для новых клиентов',
        image: "https://c.animaapp.com/mdsj6ig00k4ngn/assets/logo-mts.svg",
        imageClass: "box-border w-[130px] mb-5"
      },
      {
        id: 'flowwow',
        description: 'Крупнейшая онлайн-платформа для продавцов и покупателей Flowwow генерировала тёплые заявки с сайта через колесо',
        image: "https://c.animaapp.com/mdsj6ig00k4ngn/assets/logo-flowwow.svg",
        imageClass: "box-border w-[140px] mb-5"
      },
      {
        id: 'sletat',
        description: 'Сеть туристических агентств Слетать.ру\nполучают заявки на франшизу',
        image: "https://c.animaapp.com/mdsj6ig00k4ngn/assets/logo-sletat.png",
        imageClass: "box-border w-[140px] mb-5"
      },
      {
        id: 'others',
        description: 'А также тысячи предпринимателей и компаний используют колесо в своей работе каждый день'
      }
    ]
  ] as const;
  