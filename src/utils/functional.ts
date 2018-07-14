export const compose = (...functions: Function[]) => (value: any) =>
  functions.reduceRight((accu, curr) => curr(accu), value);

export const log = (label: string) => (x: any) => {
  console.log(label, x);
  return x;
};
