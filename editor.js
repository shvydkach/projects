// слово (транслітерація): інтернет-комунікація
// для редактора вписати: інтернет-комунікація
// має показуватись: інтернет комунікація

// слово (транслітерація): облдержадміністрація
// для редактора вписати: облдерж--адміністрація
// має показуватись: облдерж адміністрація

// слово (транслітерація): супроводжуватиметься
// для редактора вписати: супроводжу--ватиметься
// має показуватись: супроводжу ватиметься

// В даній міні-програмі текст має вводитись форматованим
// Наприклад, крапки та коми показуватись не будуть, але будуть паузи

const testText = "Із північними вітрами надходитиме холодне повітря з північних широт. 16 – 17 грудня погоду формуватиме північноатлантичний циклон. Він супроводжуватиметься шквальним вітром швидкістю 15-20 метрів на секунду та мокрим снігом. Температура впродовж доби становитиме -3...+2 градусів."

const testText2 = "Він супроводжу--ватиметься шквальним південно-західним вітром швидкістю [15 - 20] метрів [на секунду] з словацько-польсько-угорського напрямку."


/* Форматований текст 
(який повинен ввести редактор) */
// Із північними вітрами надходитиме холодне повітря з північних широт. 
// [16 - 17] грудня погоду формуватиме північно--атлантичний циклон. 
// Він супроводжу--ватиметься шквальним вітром швидкістю [15 - 20] метрів [на секунду] та мокрим снігом. 
// Температура впродовж доби становитиме -3 до +2градусів.

/* Текст в транслітерації 
(який може прочитати користувач) */
// Із північними вітрами надходитиме холодне повітря з північних широт. 
// 16 - 17 грудня погоду формуватиме північноатлантичний циклон. 
// Він супроводжуватиметься шквальним вітром швидкістю 15 - 20 метрів на секунду та мокрим снігом. 
// Температура впродовж доби становитиме від -3 до +2 градусів.

/* Текст з розміткою для комп'ютера 
(тобто, як фактично його буде розуміти й прочитувати програма) */
// Із північними вітрами надходитиме холодне повітря з північних широт[/пауза] 
// [/показати разом](16 - 17) грудня погоду формуватиме північно[/перенести]атлантичний циклон[/пауза] 
// Він супровод[/перенести]жуватиметься шквальним вітром швидкістю [/показати разом](15 - 20) метрів [/показати разом](на секунду) та мокрим снігом[/пауза]  
// Температура впродовж доби становитиме -3...+2 градусів[/пауза] 

const input = document.querySelector(".text-input")
const outputWords = document.querySelector(".words")
const outputText = document.querySelector(".text-output")



// Коли щось вводиться чи видаляється
input.addEventListener("input", (e) => {
  let textInput = getInput()
  let basicWords = splitBySpaces(textInput)
  let formattedWords = forComp(basicWords)
  let transliteration = forUser(basicWords)
  displayWords(formattedWords)
  displayTransliteration(transliteration)
})


// Отримання текста з розміткою редактора
function getInput() {
  return input.value
}


// Розподіл форматованого тексту на слова, які будуть прочитуватись
function splitBySpaces(text) {

  return text.split(" ")
    .filter(word => word.trim() !== '')
    .map(word => word.trim())
}
  
// Приймає масив зі слів розподілених пробілом
// Опрацьовує редакторську розмітку
// Повертає масив зі слів, які мають прочитуватись
function forComp(wordsArr) {

  let words = []
  for (let i = 0; i < wordsArr.length; i++) {

    // перевірка на початок об'єднаних слів
    if (wordsArr[i].indexOf("[") === 0) {
      // з першого слова прибирається знак [
      let firstWordUnited = wordsArr[i].substring(1, wordsArr[i].length)

      // масив з усіма словами між знаками об'єднання [ та ]
      let wordsUnited = [firstWordUnited]
      for (let j = i + 1; j < wordsArr.length; j++) {
        // допоки не зустрінеться слово, що закінчується на ]  
        if (wordsArr[j].indexOf("]") !== wordsArr[j].length - 1) {
          wordsUnited.push(wordsArr[j])
        } else {
          wordsUnited.push(wordsArr[j])
          // дане об'єднання закінчилось
          // перейти до перевірки наступних слів
          i = j
          break
        }
      }
      let wordUnited = ""
      // слова з масиву в одне слово
      wordsUnited.forEach((word, index, arr) => {
        // якщо останнє слово з об'єднання, то не додавати пробіл
        if (index !== arr.length - 1) {
          wordUnited += word
          wordUnited += " "
        } else {
          // це останнє слово
          // прибирається знак ] 
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
      // якщо слово задовге
      if (wordsArr[i].length > 16) {
        alert(`${wordsArr[i]} - задовге (< 15 букв)`)
      } else {
        // ! Тут можна було б і забрати крапки
        // if (word.indexOf(".") === word.length - 1) ... 
        // Адже крапки не мають показуватись
        // Замість крапок має бути невелика пауза
        // Але тут немає програми для прочитання
        // Крапки будуть забиратись там 
        words.push(wordsArr[i])
      }
    }
  }

  return words
}
  
// Приймає масив зі слів розподілених пробілом
// Повертає той текст, який користувач може прочитати в транслітерації
function forUser(wordsArr) {
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
      let wordFromDoubleHyphen = ""
      wordsByDoubleHyphen.forEach(word => wordFromDoubleHyphen += word)
      words.push(wordFromDoubleHyphen)
    }

    // перевірка на переніс по дефісу
    else if(wordsArr[i].indexOf("-") !== -1) {
      words.push(wordsArr[i])
    }

    // просто слово
    else {
      words.push(wordsArr[i])
    }
  }

  let transliteration = ""
  words.forEach(word => {
    transliteration += word
    transliteration += " "
  })

  return transliteration
}



// Відображення слів, які мають прочитуватись на сторінці (другий блок)
function displayWords(words) {
  outputWords.innerHTML = ''
  
  words.forEach(word => {
    let newWord = document.createElement("p")
    newWord.innerText = word
    newWord.classList.add("word")
    outputWords.appendChild(newWord)
  })

  return true
}

// Відображення транслітерації на сторінці (третій блок)
function displayTransliteration(transliteration) {
  outputText.value = transliteration
  return true
}
