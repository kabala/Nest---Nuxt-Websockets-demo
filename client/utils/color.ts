interface HSLColor {
  h: number;
  s: number;
  l: number;
}

const colorParams = {
  s: 80,
  l: 60
};

export default function createRandomColor(): HSLColor {
  // HSL color mode is recommended
  // because it can create colors with the same level of saturation and lightness
  return { h: Math.floor(Math.random() * 360) + 1, ...colorParams };
}
