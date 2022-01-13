// Для прикладу: 
// Із північними вітрами надходитиме холодне повітря з північних широт. [16 - 17] грудня погоду формуватиме північно-атлантичний циклон. Він супроводжу--ватиметься шквальним вітром швидкістю [15 - 20] метрів на секунду з угорсько-польсько-словацького напрямку та мокрим снігом. Температура впродовж доби становитиме [від -3] [ до +2] градусів.


const start = document.querySelector(".start")
const output = document.querySelector(".output-text")
const outputBox = document.querySelector(".output")
const wordOutput = document.querySelector(".word")
const inputBlock = document.querySelector(".textarea-input")
const plus = document.querySelector(".plus")
const minus = document.querySelector(".minus")
const wpm = document.querySelector(".wpm")
const fontsizePlus = document.querySelector(".fontsize-plus")
const fontsizeMinus = document.querySelector(".fontsize-minus")
const fontsize = document.querySelector(".fontsize-btn")
const focusLine = document.querySelector(".focus")

let speed = Math.round(1000 / ( wpm.value / 60 ))

let canStartAgain = true

// Час (мілісекунди) через який почнеться читання
// Це для того, щоб все в браузері "вляглось" 
// і можна було б записати відео для соцмереж
const scrollTimeout = 2000

start.addEventListener("click", () => {
  updateSpeed()
  let inputText = splitBySpaces(inputBlock.value)
  let words = forComp(inputText)

  if (canStartAgain) {
    setTimeout(() => {
      showing(words)
    }, scrollTimeout);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
})

plus.addEventListener("click", increaseWpm)
minus.addEventListener("click", decreaseWpm)

fontsizePlus.addEventListener("click", increaseFontsize)
fontsizeMinus.addEventListener("click", decreaseFontsize)


function focusIndex(text) {
  let focusOnIndex = 0

  switch (text.length) {
    case 1:
      focusOnIndex = 0
      break;
    case 2:
      focusOnIndex = 0
      break;
    case 3:
      focusOnIndex = 1
      break;
    case 4:
      focusOnIndex = 1
      break;
    case 5:
      focusOnIndex = 1
      break;
    case 6:
      focusOnIndex = 2
      break;
    case 7:
      focusOnIndex = 2
      break;
    case 8:
      focusOnIndex = 3
      break;
    case 9:
      focusOnIndex = 3
      break;
    case 10:
      focusOnIndex = 3
      break;
    case 11: 
      focusOnIndex = 4
      break;
    case 12: 
      focusOnIndex = 4
      break;
    case 13: 
      focusOnIndex = 5
      break;
    case 14: 
      focusOnIndex = 5
      break;
    case 15: 
      focusOnIndex = 5
      break;
    default:
      focusOnIndex = undefined
      break;
  }

  return focusOnIndex
}


function getFontsize() {
  let styles = getComputedStyle(document.documentElement)
  return styles.getPropertyValue('--fontsize')
}


function increaseFontsize(){
  console.log("Збільшую шрифт")
  let currentFontsizePx = getFontsize()
  let currentFontsize = parseInt(currentFontsizePx.substring(0, 2), 10)

  currentFontsize += 1
  const doc = document.documentElement
  doc.style.setProperty('--fontsize', `${currentFontsize}px`)
  fontsize.value = currentFontsize
}

function decreaseFontsize(){
  console.log("Зменшую шрифт")
  let currentFontsizePx = getFontsize()
  let currentFontsize = parseInt(currentFontsizePx.substring(0, 2), 10)

  currentFontsize -= 1
  const doc = document.documentElement
  doc.style.setProperty('--fontsize', `${currentFontsize}px`)
  fontsize.value = currentFontsize
}

function updateSpeed() {
  speed = Math.round(1000 / ( wpm.value / 60 ))
}

function increaseWpm(){
  let currentWpm = parseInt(wpm.value, 10)
  currentWpm += 10
  wpm.value = currentWpm
}

function decreaseWpm(){
  let currentWpm = parseInt(wpm.value, 10)
  currentWpm -= 10
  wpm.value = currentWpm
}


// Для об'єднаних слів замінити пробіли на &nbsp;
// Це для того, щоб воно показувалось на одній лінії

function showing(input) {
  let counter = -1

  if (input.length > 0) {
    const interval = setInterval(() => {
      if (counter !== input.length - 1) {
          counter++   
          canStartAgain = false

          // Слово, що має прочитуватись
          let currentWord = input[counter]

          // Індекс тої букви, яка має виділятись при сфокусованому режимі прочитання
          let focusOn = focusIndex(currentWord)
          
          if (focusOn !== undefined) {
            let firstLetters = currentWord.substring(0, focusOn) 
            let focusLetter = currentWord.substring(focusOn, focusOn + 1)
            let lastLetters = currentWord.substring(focusOn + 1, currentWord.length)

            // Заміна всіх пробілів на спецсимвол &nbsp;
            // Це для того, щоб не було переносу на інший рядок
            // Наприклад: 
            // редакторський текст: "[16 - 17] грудня"
            // Функція splitBySpaces повертає з цього масив: ["[16", "-", "17]", "грудня"]
            // Функція forComp повертає з цього масив: ["16 - 17", "грудня"]
            // Нижчезастосований replaceAll замінює пробіли на &nbsp;
            // Так, що "16 - 17" перетворюється на "16&nbsp;-&nbsp;17" , яке й вставляється в HTML
            firstLetters = firstLetters.replaceAll(" ", "&nbsp;")
            focusLetter = focusLetter.replaceAll(" ", "&nbsp;")
            lastLetters = lastLetters.replaceAll(" ", "&nbsp;")

            wordOutput.innerHTML = `
            <span class="focused">
              <span class="letter letter1">${firstLetters}</span>
              ${focusLetter}
              <span class="letter letter2">${lastLetters}</span>
            </span>
          `
          }
          // якщо слово задовге, то focusOn буде undefined, і це виконається
          else {
            clearInterval(interval)
            wordOutput.innerHTML = `
              <span class="err">Довжина до 15 букв!</span>
            `
          }
      } 
      else {
        clearInterval(interval)
        canStartAgain = true
      }
    }, speed)
  } 
  else {
    output.innerHTML = "Немає вхідних даних"
  }
}


function splitBySpaces(text) {
  return text.split(" ")
    .filter(word => word.trim() !== '')
    .map(word => word.trim())
}

  
function forComp(wordsArr) {
  let words = []
  for (let i = 0; i < wordsArr.length; i++) {

    // перевірка на початок об'єднаних слів
    if (wordsArr[i].indexOf("[") === 0) {
      let firstWordUnited = wordsArr[i].substring(1, wordsArr[i].length)
      let wordsUnited = [firstWordUnited]
      for (let j = i + 1; j < wordsArr.length; j++) {
        if (wordsArr[j].indexOf("]") !== wordsArr[j].length - 1) {
          wordsUnited.push(wordsArr[j])
        } else {
          wordsUnited.push(wordsArr[j])
          i = j
          break
        }
      }
      let wordUnited = ""
      wordsUnited.forEach((word, index, arr) => {
        if (index !== arr.length - 1) {
          wordUnited += word
          wordUnited += " "
        } else {
          wordUnited += word.substring(0, word.length - 1)
        }
      })
      words.push(wordUnited)
    }

    // перевірка на спеціальний переніс
    else if(wordsArr[i].indexOf("--") !== -1) {
      let wordsByDoubleHyphen = wordsArr[i].split("--")
      wordsByDoubleHyphen.forEach(word => words.push(word))
    }

    // перевірка на переніс по дефісу
    else if(wordsArr[i].indexOf("-") !== -1) {
      let wordsByHyphen = wordsArr[i].split("-")
      wordsByHyphen.forEach(word => words.push(word))
    }

    // просто слово
    else {
      if (wordsArr[i].length > 16) {
        alert(`${wordsArr[i]} - задовге (< 15 букв)`)
      } else {
        if (wordsArr[i].indexOf(".") === wordsArr[i].length - 1) {
          words.push(wordsArr[i].substring(0, wordsArr[i].length - 1))
          // симуляція паузи за допомогою двох невидимих слів
          words.push("   ")
          words.push("   ")
        } else {
          words.push(wordsArr[i])
        }
      }
    }
  }

  return words
}

