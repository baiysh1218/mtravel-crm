export const formatShowPrice = (price?: string | number): string => {
  const _price = String(price || "");

  if (_price && _price?.length) {
    return new Intl.NumberFormat("ru-RU").format(parseFloat(_price));
  }

  return "";
};
