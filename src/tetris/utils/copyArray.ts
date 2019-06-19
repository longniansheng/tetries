export default function copyArray(arr: number[][] = []): number[][] {
  const result: number[][] = [];

  arr.forEach(item => {
    const temp = [...item];
    result.push(temp);
  });

  return result;
}