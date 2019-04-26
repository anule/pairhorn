function single(arr){
  return `✨ ${arr[0]} is dancing on their own 🔥💾`
}

function double(arr){
  return `✨ ${arr[0]} is 🍐-ing with ${arr[1]}`
}

module.exports = (array) => {
  let message = []
  for (let i = 0; i < array.length; i++) {
    if (array[i].length === 1) {
      message.push(single(array[i]) + '\n')
    } else {
      message.push(double(array[i])+'\n')
    }
  }
  return message.join('')
}