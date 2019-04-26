// Use the Fisher-Yates shuffle algorithm
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function convertToArray(string) {
  return string.split(' ');
}


module.exports = {
  pairs: (string) => {
    let arr = shuffle(string.split(' '))
    let pairs = [];
    if (arr.length % 2 == 0) {
      for (var i = 0; i <= arr.length-1; i+=2) {
        pairs.push([arr[i], arr[i+1]])
      }
    } else {
      for (var i = 0; i < arr.length-1; i+=2) {
        pairs.push([arr[i], arr[i+1]]);
      }
      pairs.push([arr[arr.length-1]]);
    }
    return pairs;
  }
}