import { createI18n } from 'vue-i18n'

import uz from './locale/uz'
import ru from './locale/ru'

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: import.meta.env.VITE_APP_I18N_LOCALE || localStorage.getItem('lang') || "ru",
    fallbackLocale: import.meta.env.VITE_APP_I18N_FALLBACK_LOCALE || localStorage.getItem('lang') || "ru",
    messages: {
        uz,
        ru,
    }
})

export default i18n