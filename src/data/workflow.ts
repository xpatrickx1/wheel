export interface WorkflowStep {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly containerClass: string;
  }
  
  export const workflowSteps: WorkflowStep[][] = [
    [
      {
        id: 'installation',
        title: 'Установка',
        description: 'Добавляете код виджета на свой сайт. Виджет показывается в самый удачный момент для заявки.',
        containerClass: "relative items-center bg-neutral-800 shadow-[rgba(0,0,0,0)_0px_10px_30px_0px] box-border flex h-[200px] justify-center text-center p-[30px] rounded-[15px] md:text-left before:accent-auto before:box-border before:text-white before:hidden before:text-base before:not-italic before:normal-nums before:font-light before:h-0.5 before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:absolute before:right-[-150px] before:text-center before:indent-[0px] before:normal-case before:visible before:w-[150px] before:border before:border-indigo-600 before:m-auto before:border-separate before:border-solid before:inset-y-0 before:font-raleway before:md:block before:md:text-left"
      },
      {
        id: 'bonus',
        title: 'Бонус за заявку',
        description: 'Клиенты выигрывают символические призы — бесплатную доставку, скидку или любой приятный бонус',
        containerClass: "relative items-center bg-neutral-800 shadow-[rgba(0,0,0,0)_0px_10px_30px_0px] box-border flex h-[200px] justify-center text-center p-[30px] rounded-[15px] md:text-left before:accent-auto before:border-b-indigo-600 before:border-r-indigo-600 before:border-t-indigo-600 before:box-border before:text-white before:hidden before:text-base before:not-italic before:normal-nums before:font-light before:h-[330px] before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:absolute before:right-[-60px] before:text-center before:indent-[0px] before:normal-case before:visible before:w-[60px] before:z-[-1] before:rounded-r-[60px] before:border-l-white before:border-r-2 before:border-y-2 before:border-separate before:top-[90px] before:font-raleway before:md:block before:md:text-left"
      }
    ],
    [
      {
        id: 'sale',
        title: 'Продажа',
        description: 'Предоставляете бонус при оформлении заказа, либо выводите промо-код. Вы получаете тёплые заявки.',
        containerClass: "relative items-center bg-neutral-800 shadow-[rgba(0,0,0,0)_0px_10px_30px_0px] box-border flex h-[200px] justify-center text-center p-[30px] rounded-[15px] md:text-left before:accent-auto before:box-border before:text-white before:hidden before:text-base before:not-italic before:normal-nums before:font-light before:h-0.5 before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:absolute before:right-[-150px] before:text-center before:indent-[0px] before:normal-case before:visible before:w-[150px] before:border before:border-indigo-600 before:m-auto before:border-separate before:border-solid before:inset-y-0 before:font-raleway before:md:block before:md:text-left after:accent-auto after:border-b-indigo-600 after:border-l-indigo-600 after:border-t-indigo-600 after:box-border after:text-white after:hidden after:text-base after:not-italic after:normal-nums after:font-light after:h-[330px] after:left-[-60px] after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:absolute after:text-center after:indent-[0px] after:normal-case after:visible after:w-[60px] after:z-[-1] after:rounded-l-[60px] after:border-l-2 after:border-r-white after:border-y-2 after:border-separate after:top-[90px] after:font-raleway after:md:block after:md:text-left"
      },
      {
        id: 'spinning',
        title: 'Вращение колеса',
        description: 'Крутить колесо можно после заполнения поля с номером телефона, либо email. Можно настроить и без формы.',
        containerClass: "relative items-center bg-neutral-800 shadow-[rgba(0,0,0,0)_0px_10px_30px_0px] box-border flex h-[200px] justify-center text-center p-[30px] rounded-[15px] md:text-left"
      }
    ],
    [
      {
        id: 'integration',
        title: 'Интеграция',
        description: 'Оповещения о заявках приходят в Telegram и VK. Есть интеграции с AmoCRM, Битрикс24, Яндекс Метрикой и Google Analytics',
        containerClass: "relative items-center bg-neutral-800 shadow-[rgba(0,0,0,0)_0px_10px_30px_0px] box-border flex h-[200px] justify-center text-center p-[30px] rounded-[15px] md:text-left before:accent-auto before:box-border before:text-white before:hidden before:text-base before:not-italic before:normal-nums before:font-light before:h-0.5 before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:absolute before:right-[-150px] before:text-center before:indent-[0px] before:normal-case before:visible before:w-[150px] before:border before:border-indigo-600 before:m-auto before:border-separate before:border-solid before:inset-y-0 before:font-raleway before:md:block before:md:text-left"
      },
      {
        id: 'funnel',
        title: 'В воронку',
        description: 'После заявки можно увести клиента на любую страницу сайта или в Telegram бота',
        containerClass: "relative items-center bg-neutral-800 shadow-[rgba(0,0,0,0)_0px_10px_30px_0px] box-border flex h-[200px] justify-center text-center p-[30px] rounded-[15px] md:text-left"
      }
    ]
  ] as const;
  