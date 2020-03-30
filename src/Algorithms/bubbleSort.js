export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  bubbleSortHelper(array, animations, auxiliaryArray);
  return animations;
}

function bubbleSortHelper(mainArray, animations, auxiliaryArray) {
  doBubbleSort(mainArray, animations, auxiliaryArray);
}

function doBubbleSort(array, animations, auxiliaryArray) {
  var swapped;
  do {
    swapped = false;
    for (var i = 0; i < auxiliaryArray.length - 1; i++) {
      if (auxiliaryArray[i] > auxiliaryArray[i + 1]) {
        var temp = auxiliaryArray[i];
        auxiliaryArray[i] = auxiliaryArray[i + 1];
        auxiliaryArray[i + 1] = temp;
        animations.push([i, i + 1]);
        swapped = true;
      }
    }
  } while (swapped);
}
