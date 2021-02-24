export function downloadFile(fileData, type: string, fileName: string) {
  const blob = new Blob([fileData], {type});
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.dispatchEvent(new MouseEvent('click'));
  window.URL.revokeObjectURL(url);
}
