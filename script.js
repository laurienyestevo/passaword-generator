const NUMBERS = '0123456789';
const CAPITAL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const SPECIAL_CHARACTERS = '!"@#$%&*()_+=-{}[]`~/;.,<>?:'; 

const IterateArray = (length) => Array.from(Array(length));

const passwordHasNumber = (str) => /[\d]/.test(str) //regexp metacaracter numbers

const passarwordHasCapitalLetters = (str) => /[A-Z]/.test(str)


const passwordHasLowerLetters = (str) => /[a-z]/.test(str)

const passwordHasSpecialCaracters = (str) => /[!@#$%()_+\-=\[\]{};":"\\|,.<>\/?/]/.test(str);

const rulesConfiguration = {
    'hasNumbers': [NUMBERS, passwordHasNumber],
    'hasCapitalLetters': [CAPITAL_LETTERS, passarwordHasCapitalLetters],
    'hasLowerLetters': [LOWER_LETTERS, passwordHasLowerLetters],
    'hasSpecialCaracters':[SPECIAL_CHARACTERS, passwordHasSpecialCaracters]
}

const removeInvalidRules = (rules) =>{
    const rulesConfigurationKeys = Object.keys(rulesConfiguration)
    return rules.filter((rule)=> rulesConfigurationKeys.includes(rule))
}

const buildAvailableChars = (rules) => {
    return rules.reduce((accumulator, currentRule) =>{
        const [currentCharacters] = rulesConfiguration[currentRule]
        return accumulator + currentCharacters;
    }, '')
}
const valid = (rules , password) =>{
    return rules.every((currentValue) =>{
        const [_, fn] = rulesConfiguration[currentValue]
        return fn(password)
    })
}

const generatePassaword = (rules, characters) => {
    const password = IterateArray(16).reduce((accumulator, _) => {
        const randomIndex = Math.floor(Math.random() * characters.length)
        return accumulator + characters [randomIndex]
    }, '');
    return valid(rules, password)
        ? password
        :generatePassaword(rules , characters)
}

const generator = (rules) =>{
    const availableRules = removeInvalidRules(rules)
    const characters = buildAvailableChars(availableRules)
    return generatePassaword(availableRules,characters)
}



function handleClickGenerateBtn (){
    const switchNumbers = document.querySelector('#switch-numbers');
    const switchCapitalLetters = document.querySelector('#switch-capital-letters');
    const switchSpecialCharacters = document.querySelector('#switch-special-characters');

const checkedNumbers = switchNumbers.checked
const checkedCapitalLetters = switchCapitalLetters.checked
const checkedSpecialCharacters = switchSpecialCharacters.checked

const rules = [
    'hasLowerLetters',
    ...[checkedNumbers && 'hasNumbers'],
    ...[checkedCapitalLetters && 'hasCapitalLetters'],
    ...[checkedSpecialCharacters && 'hasSpecialCaracters']
]
const password = generator(rules)
document.querySelector('#input-password').value = password
}
function handleClickCopyBtn (){
    const password = document.querySelector('#input-password').value;
    window.navigator.clipboard.writeText(password)
}