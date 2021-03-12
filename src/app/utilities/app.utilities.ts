export function downloadFile(fileData, type: string, fileName: string) {
  const blob = new Blob([fileData], {type});
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.dispatchEvent(new MouseEvent('click'));
  window.URL.revokeObjectURL(url);
}

export function getPrecisionRoundFunctionFor(precision: number): (v: number) => number {
  return (value) => {
    const factor = Math.pow(10, precision || 0);
    return Math.round(value * factor) / factor;
  };
}

export function precisionRound(value: number, precision: number): number {
  return getPrecisionRoundFunctionFor(precision)(value);
}
