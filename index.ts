/* 
   >	 increment the data pointer (to point to the next cell to the right).
   <	 decrement the data pointer (to point to the next cell to the left).
   +	 increment (increase by one) the byte at the data pointer.
   -	 decrement (decrease by one) the byte at the data pointer.
   .	 output the byte at the data pointer.
   ,	 accept one byte of input, storing its value in the byte at the data pointer.
   
   [	 if the byte at the data pointer is zero, then instead of moving the instruction 
          pointer forward to the next command, jump it forward to the command after the matching ] command.

   ]	 if the byte at the data pointer is nonzero, then instead of moving the instruction
          pointer forward to the next command, jump it back to the command after the matching [ command.
*/

let memory = new Uint8Array(1000)

let index = 0

let program =
  '++++++++++[>+>+++>++++>+++++++>++++++++>+++++++++>++++++++++>+++++++++++>++++++++++++<<<<<<<<<-]>>>>+.>>>>+..<.<++++++++.>>>+.<<+.<<<<++++.<++.>>>+++++++.>>>.+++.<+++++++.--------.<<<<<+.<+++.---.'

let cursor = 0

let bracketPointer = cursor

let bracketDepth = 0

let output = ''

while (cursor < program.length) {
  switch (program[cursor]) {
    case '>':
      index++
      if (index > 999) index = 0
      break
    case '<':
      index--
      if (index < 0) index = 999
      break
    case '+':
      memory[index]++
      break
    case '-':
      memory[index]--
      break
    case '.':
      output += String.fromCharCode(memory[index])
      break
    case ',':
      break
    case '[':
      if (memory[index] === 0) {
        bracketPointer = cursor + 1
        bracketDepth = 0
        while (program[bracketPointer] !== ']' || bracketDepth !== 0) {
          if (program[bracketPointer] === '[') {
            bracketDepth++
          } else if (program[bracketPointer] === ']') {
            bracketDepth--
          }
          bracketPointer++
        }
        cursor = bracketPointer
      }
      break
    case ']':
      if (memory[index] !== 0) {
        bracketPointer = cursor - 1
        bracketDepth = 0
        while (program[bracketPointer] !== '[' || bracketDepth !== 0) {
          if (program[bracketPointer] === ']') {
            bracketDepth++
          } else if (program[bracketPointer] === '[') {
            bracketDepth--
          }
          bracketPointer--
        }
        cursor = bracketPointer
      }
      break
    default:
      throw new Error('unknown op code!')
  }
  cursor++
}

console.log('output:', output)
