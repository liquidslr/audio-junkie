export default function downloadBlob(blob, filename) {
  const url = window.URL.createObjectURL(blob);
  const click = document.createEvent("Event");
  click.initEvent("click", true, true);

  const link = document.createElement("A");
  link.href = url;
  link.download = filename;
  link.dispatchEvent(click);
  link.click();
  return link;
}
