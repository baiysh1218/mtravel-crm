export function useCopyText(value: string) {
  const copyTextarea = document.createElement("textarea");
  copyTextarea.style.position = "fixed";
  copyTextarea.style.opacity = "0";
  copyTextarea.textContent = value;

  document.body.appendChild(copyTextarea);
  copyTextarea.select();
  document.execCommand("copy");
  document.body.removeChild(copyTextarea);
}
