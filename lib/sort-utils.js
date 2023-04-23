const selectionSort = function(list){
  const sortedList = list.slice();

  for(let index = 0; index < list.length; index++){
    let minNumber = sortedList[index];
    let indexOfmin = index; 
    for(let pos = index; pos < list.length; pos++){
      if(sortedList[pos] < minNumber){
        minNumber = sortedList[pos];
        indexOfmin = pos;
      }
    }
    const number = sortedList[index];
    sortedList[index] = minNumber;
    sortedList[indexOfmin] = number;
  }

  return sortedList;
};

const bubbleSort = function(list){
  for(let index = 0; index < list.length - 1; index++){
    for(let pos = 0; pos < list.length - 1; pos++){
      if(list[pos] > list[pos + 1]){
        const numberToSwap = list[pos];
        list[pos] = list[pos + 1];
        list[pos + 1] = numberToSwap;
      }
    }
  }

  return list;
};

exports.selectionSort = selectionSort;
exports.bubbleSort = bubbleSort;
