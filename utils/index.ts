export function randomImage() {
  return `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/400/400`;
}

export const secondsToString = (seconds: number) =>
  new Date(seconds * 1000).toISOString().slice(14, 19);
