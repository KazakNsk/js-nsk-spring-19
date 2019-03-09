/**
 * Напишите функцию getIntersection(first, second), возвращающую
 * массив из общих значений массивов first и second.
 *
 * Результирующий массив должен быть отсортирован по возрастанию.
 *
 * Пример:
 * getIntersection([1, 3, 5, 7, 9], [1, 2, 3, 4]); //  [1, 3]
 * getIntersection([1, 1, 2], [2, 1, 1, 1]); // [1, 1, 2]
 *
 * @param  {number[]} first исходные массивы
 * @param  {number[]} second исходные массивы
 * @return {number[]} массив значений, отсортированный по возрастанию
 */
export function getIntersection(first, second) {
    arr1= first;
    arr2 = second;
    let i = 0;
    result =[];
    while (i<arr2.length){
        if (arr1.some(number =>number === arr2[i])){
            let remove = arr2.splice(i,1);
            let num = +remove.join('');
            result.push(num);
            arr1.splice(arr1.indexOf(num),1);
        }
        else i++;
    }
    return result.sort((a,b) => a-b);
}
