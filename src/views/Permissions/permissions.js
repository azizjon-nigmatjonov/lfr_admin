let permissions = [


    {title: 'Боковая панель -> Финансы', subject: 'sidebar-finance', action: ['read']},
    {title: 'Боковая панель -> Склад', subject: 'sidebar-warehouse', action: ['read']},
    {title: 'Боковая панель -> Склад -> Сырьё', subject: 'sidebar-warehouse-raw', action: ['read']},
    {title: 'Боковая панель -> Склад -> Аксессуары', subject: 'sidebar-warehouse-accessories', action: ['read']},
    {title: 'Боковая панель -> Склад -> Оборудование', subject: 'sidebar-warehouse-equipment', action: ['read']},
    {title: 'Боковая панель -> Склад -> Техника', subject: 'sidebar-warehouse-tech', action: ['read']},
    {title: 'Боковая панель -> Производство', subject: 'sidebar-production', action: ['read']},
    {title: 'Боковая панель -> Цехи', subject: 'sidebar-factories', action: ['read']},
    {title: 'Боковая панель -> Цехи -> Матрас', subject: 'sidebar-factories-mattress', action: ['read']},
    {title: 'Боковая панель -> Цехи -> Подушка', subject: 'sidebar-factories-pillow', action: ['read']},
    {title: 'Боковая панель -> Цехи -> Губка', subject: 'sidebar-factories-sponge', action: ['read']},
    {title: 'Боковая панель -> Цехи -> Фигурная резка', subject: 'sidebar-factories-curly-cutting', action: ['read']},
    {title: 'Боковая панель -> Продажи', subject: 'sidebar-sellings', action: ['read']},
    {title: 'Боковая панель -> Клиенты', subject: 'sidebar-customers', action: ['read']},
    {title: 'Боковая панель -> Поставщики', subject: 'sidebar-suppliers', action: ['read']},
    {title: 'Боковая панель -> Заказы', subject: 'sidebar-orders', action: ['read']},
    {title: 'Боковая панель -> Сотрудники', subject: 'sidebar-employees', action: ['read']},
    
    
    
    {title: 'Верхняя панель -> Приход', subject: 'navbar-raw-add', action: ['read']},
    {title: 'Верхняя панель -> Продажа', subject: 'navbar-product-sell', action: ['read']},
    {title: 'Верхняя панель -> Кодовая база', subject: 'navbar-codebase', action: ['read']},
    {title: 'Верхняя панель -> Темный режим', subject: 'navbar-darkmode', action: ['read']},
    {title: 'Верхняя панель -> Уведомление', subject: 'navbar-notification', action: ['read']},
    {title: 'Верхняя панель -> Настройки', subject: 'navbar-settings', action: ['read']},
    
    
    
    {title: 'Настройки -> Профиль', subject: 'settings-profile', action: ['read']},
    {title: 'Настройки -> Роли', subject: 'settings-roles', action: ['read']},
    {title: 'Настройки -> Разрешения', subject: 'settings-permissions', action: ['read']},
    {title: 'Настройки -> Пользователи', subject: 'settings-users', action: ['read']},
    
    
    
    {title: 'Финансы', subject: 'finance', action: ['read', 'update', 'delete']},
    
    {title: 'Склад -> Сырьё -> Приход', subject: 'warehouse-raw-coming', action: ['read', 'update', 'delete']},
    {title: 'Склад -> Сырьё -> Расход', subject: 'warehouse-raw-expense', action: ['read', 'update', 'delete']},
    {title: 'Склад -> Сырьё -> Склад', subject: 'warehouse-raw-warehouse', action: ['read', 'update', 'delete']},
    {title: 'Склад -> Сырьё -> Перемещение', subject: 'warehouse-raw-moving', action: ['read']},
    
    {title: 'Склад -> Аксессуары -> Приход', subject: 'warehouse-accessories-coming', action: ['read', 'update', 'delete']},
    {title: 'Склад -> Аксессуары -> Расход', subject: 'warehouse-accessories-expense', action: ['read', 'update', 'delete']},
    {title: 'Склад -> Аксессуары -> Склад', subject: 'warehouse-accessories-warehouse', action: ['read', 'update', 'delete']},
    {title: 'Склад -> Аксессуары -> Перемещение', subject: 'warehouse-accessories-moving', action: ['read']},
    
    
    {title: 'Склад -> Оборудование -> Приход', subject: 'warehouse-equipment-coming', action: ['read', 'update', 'delete']},
    {title: 'Склад -> Оборудование -> Расход', subject: 'warehouse-equipment-expense', action: ['read', 'update', 'delete']},
    {title: 'Склад -> Оборудование -> Склад', subject: 'warehouse-equipment-warehouse', action: ['read', 'update', 'delete']},
    
    
    {title: 'Склад -> Техника -> Приход', subject: 'warehouse-tech-coming', action: ['read', 'update', 'delete']},
    {title: 'Склад -> Техника -> Расход', subject: 'warehouse-tech-expense', action: ['read', 'update', 'delete']},
    {title: 'Склад -> Техника -> Склад', subject: 'warehouse-tech-warehouse', action: ['read', 'update', 'delete']},
    
    
    {title: 'Производство -> Приход(Сырьё)', subject: 'production-coming-raw', action: ['read', 'update', 'delete']},
    {title: 'Производство -> Приход(Готовая продукция)', subject: 'production-coming-ready', action: ['read', 'update', 'delete']},
    {title: 'Производство -> Расход', subject: 'production-expense', action: ['read', 'update', 'delete']},
    {title: 'Производство -> Склад', subject: 'production-warehouse', action: ['read', 'update', 'delete']},
    {title: 'Производство -> Готовая продукция', subject: 'production-ready-warehouse', action: ['read', 'update', 'delete']},
    {title: 'Производство -> Перемещение', subject: 'production-moving', action: ['read']},
    {title: 'Производство -> Производство', subject: 'production-produce', action: ['read']},
    
    
    
    {title: 'Цехи -> Матрас -> Приход(Сырьё)', subject: 'factories-mattress-coming-raw', action: ['read', 'update', 'delete']},
    {title: 'Цехи -> Матрас -> Приход(Готовая продукция)', subject: 'factories-mattress-coming-ready', action: ['read', 'update', 'delete']},
    {title: 'Цехи -> Матрас -> Расход', subject: 'factories-mattress-expense', action: ['read', 'update', 'delete']},
    {title: 'Цехи -> Матрас -> Склад', subject: 'factories-mattress-warehouse', action: ['read', 'update', 'delete']},
    {title: 'Цехи -> Матрас -> Готовая продукция', subject: 'factories-mattress-ready-warehouse', action: ['read', 'update', 'delete']},
    {title: 'Цехи -> Матрас -> Производство', subject: 'factories-mattress-produce', action: ['read']},
    
    
    
    {title: 'Цехи -> Подушка -> Приход(Сырьё)', subject: 'factories-pillow-coming-raw', action: ['read', 'update', 'delete']},
    {title: 'Цехи -> Подушка -> Приход(Готовая продукция)', subject: 'factories-pillow-coming-ready', action: ['read', 'update', 'delete']},
    {title: 'Цехи -> Подушка -> Расход', subject: 'factories-pillow-expense', action: ['read', 'update', 'delete']},
    {title: 'Цехи -> Подушка -> Склад', subject: 'factories-pillow-warehouse', action: ['read', 'update', 'delete']},
    {title: 'Цехи -> Подушка -> Готовая продукция', subject: 'factories-pillow-ready-warehouse', action: ['read', 'update', 'delete']},
    {title: 'Цехи -> Подушка -> Производство', subject: 'factories-pillow-produce', action: ['read']},
    
    
    
    {title: 'Цехи -> Губка -> Приход(Сырьё)', subject: 'factories-sponge-coming-raw', action: ['read', 'update', 'delete']},
    {title: 'Цехи -> Губка -> Приход(Готовая продукция)', subject: 'factories-sponge-coming-ready', action: ['read', 'update', 'delete']},
    {title: 'Цехи -> Губка -> Расход', subject: 'factories-sponge-expense', action: ['read', 'update', 'delete']},
    {title: 'Цехи -> Губка -> Склад', subject: 'factories-sponge-warehouse', action: ['read', 'update', 'delete']},
    {title: 'Цехи -> Губка -> Готовая продукция', subject: 'factories-sponge-ready-warehouse', action: ['read', 'update', 'delete']},
    {title: 'Цехи -> Губка -> Производство', subject: 'factories-sponge-produce', action: ['read']},
    
    
    {title: 'Цехи -> Фигурная резка -> Приход(Сырьё)', subject: 'factories-curly-cutting-coming-raw', action: ['read', 'update', 'delete']},
    {title: 'Цехи -> Фигурная резка -> Приход(Готовая продукция)', subject: 'factories-curly-cutting-coming-ready', action: ['read', 'update', 'delete']},
    {title: 'Цехи -> Фигурная резка -> Расход', subject: 'factories-curly-cutting-expense', action: ['read', 'update', 'delete']},
    {title: 'Цехи -> Фигурная резка -> Склад', subject: 'factories-curly-cutting-warehouse', action: ['read', 'update', 'delete']},
    {title: 'Цехи -> Фигурная резка -> Готовая продукция', subject: 'factories-curly-cutting-ready-warehouse', action: ['read', 'update', 'delete']},
    {title: 'Цехи -> Фигурная резка -> Производство', subject: 'factories-curly-cutting-produce', action: ['read']},
    
    
    {title: 'Продажи', subject: 'sellings', action: ['read', 'update', 'delete']},
    
    {title: 'Клиенты', subject: 'customers', action: ['read', 'update', 'delete']},
    {title: 'Клиенты -> Добавить', subject: 'customers-add-modal', action: ['read']},
    
    {title: 'Поставщики', subject: 'suppliers', action: ['read', 'update', 'delete']},
    {title: 'Поставщики -> Добавить', subject: 'suppliers-add-modal', action: ['read']},
    
    {title: 'Заказы', subject: 'orders', action: ['read', 'update', 'delete']},
    
    {title: 'Сотрудники', subject: 'employees', action: ['read', 'update', 'delete']},
    {title: 'Сотрудники -> Добавить', subject: 'employees-add-modal', action: ['read']}




]