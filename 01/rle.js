/**
 * Напишите функцию rle(input), реализующую примитивное RLE-сжатие входящей строки input.
 * Подробнее об RLE: https://ru.wikipedia.org/wiki/Кодирование_длин_серий
 *
 * Входящая строка сооттветствует regex паттерну /^[A-Z]+$/
 *
 * Пример:
 * rle('AAAB') === 'A3B'
 * rle('BCCDDDEEEE') === 'BC2D3E4'
 *
 * Больше примеров в тестах.
 *
 * @param  {string} input
 * @return {string}
 */
export function rle(input) {
  const arr1 = input.split("");
  let arr2 = [];
  let counter = 1;
  for (let i=0; i<arr1.length + 1; i++){
    if (arr1[i]===arr1[i+1]){
      counter++;
    }
    else if (counter === 1) {
      arr2.push(arr1[i]);
      counter = 1;
    }
    else {
      arr2.push(arr1[i]+counter);
      counter = 1;
    }
  }
  return arr2.join("");
}
/** не совсем понял как в forEach сравнивать со следующим элементом,
 поэтому через обычный цикл **/
