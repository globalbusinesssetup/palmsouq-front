export const formatFileSize = (sizeInBytes: number): string => {
  const sizeInKB = sizeInBytes / 1024;
  if (sizeInKB < 1024) {
    return `${sizeInKB.toFixed(2)} KB`;
  }
  const sizeInMB = sizeInKB / 1024;
  return `${sizeInMB.toFixed(2)} MB`;
};

export async function getCountryData() {
  const response = await fetch('/countries.json');
  const data = await response.json();
  return data;
}
