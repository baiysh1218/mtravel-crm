import ru from "antd/es/date-picker/locale/ru_RU";
import ruRu from "antd/es/locale/ru_RU";

const buddhistLocale: typeof ru = {
  ...ru,
  lang: { ...ru.lang },
};

export const globalBuddhistLocale: typeof ruRu = {
  ...ruRu,
  DatePicker: {
    ...ruRu.DatePicker!,
    lang: buddhistLocale.lang,
  },
};
