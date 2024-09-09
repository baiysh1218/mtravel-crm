import dayjs from "dayjs";

export const formatDate = (
  data?: string | Date,
  formatDate = "DD/MM/YYYY HH:mm",
): string => {
  if (!data) return "";

  return dayjs(data).format(formatDate);
};

export const prepareTimeShow = (common?: number) => {
  if (!common) return 0;

  return {
    hours: Math.floor(common / 60),
    minutes: common % 60,
  };
};
