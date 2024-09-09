export const useGetCssColor = (name: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
};
