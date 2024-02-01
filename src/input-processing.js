import { II } from "./constants/error.js"
import { navUp } from "./navigator.js"

export const processInput = (command) => {
  console.log(`Command: ${command}`);
  switch (command) {
    case 'up':
      navUp()
    default:
      console.log(II)
  }
}