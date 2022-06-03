var numbers = [0,0];
var currentOperand = '';
var workString = '';    //String that temp. stores the typed in numbers. Used for base10 writing of numbers.
var isFinal = false;
var isDecimal = false;

function addNum(num){
    if (isFinal){clearAll()}
    if (num == '.'){
        if (isDecimal == false){
            workString += num;
        }
        isDecimal = true;
    } else {
        workString += num;
    }
    //Regex for one optional leading zero, that must be followed by a decimal point
    //let regex = /^(?!0\d)\d+(?:\.\d*)?$/;
    //This caused many issues all around, so i've decided to not include it
    updateDisplay();
}
function clearAll(){
    workString = '';
    numbers = [0,0];
    currentOperand = '';
    isFinal = false;
    isDecimal = false;
    updateDisplay();
}
function clearLast(){
    if (workString[workString.length-1] == currentOperand){
        currentOperand = '';
    }
    if (workString[workString.length-1] == '.'){
        isDecimal = false;
    }
    workString = workString.substring(0, workString.length-1);
    updateDisplay();
}
function updateDisplay(){
    document.getElementById("display").innerHTML = workString;
}
function addOperand(op){
    isFinal = false;
    if (currentOperand == ''){
        if (workString == '' && op == '-'){
          //If inputed operand is -, for negative numbers 
        } else {
            currentOperand = op;
            isDecimal = false;
        }
        workString += op;
    }
    updateDisplay();
}
function equals(){
    //[+\-\*\/\^], Matches for all used operads
    let split = workString.split(/[+\-\*\/\^]/);
    console.log(split);
        //This removes the first split string, if it happens to be empty
        //It can only be empty if the first char is '-'
        //Then i add the "-" back
        if (split[0]=='') {split.shift(); split[0] = "-"+split[0]}
        console.log(split[0])
    numbers[0] = parseFloat(split[0])
    numbers[1] = parseFloat(split[1])
    var result = 0;
    switch (currentOperand){
        case '+': result = numbers[0] + numbers[1]; break;
        case '-': result = numbers[0] - numbers[1]; break;
        case '*': result = numbers[0] * numbers[1]; break;
        case '/': result = numbers[0] / numbers[1]; break;
        case '^': result = Math.pow(split[0],split[1]); break;
        default: result = numbers[0];
    } 
    workString = result+'';
    numbers[0] = parseFloat(workString);
    currentOperand = '';

    if (isNaN(workString)===true) {workString = "Chyba"}
    //Jokes
        if (workString == "0.30000000000000004") workString = "Nezkousej"
    isFinal = true;
    updateDisplay();
}
var isDark = true;
function darkMode(){
    var a = document.documentElement.style;
    var b = document.querySelector("#darkmode")
    if (isDark){
        a.setProperty("--main-bg-color", "#F7ECE1")
        a.setProperty("--calculator-bg-color", "#8D86C9")
        a.setProperty("--button-bg-color", "#242038")
        a.setProperty("--hover-bg-color", "#433C68")
        a.setProperty("--footer-bg-color","#000000")
        isDark = false;
        b.innerHTML = '🌙'
    } else {
        a.setProperty("--main-bg-color", "#1F1C22")
        a.setProperty("--calculator-bg-color", "#D72638")
        a.setProperty("--button-bg-color", "#69121A")
        a.setProperty("--hover-bg-color", "#8C1823")
        a.setProperty("--footer-bg-color","#ffffff")
        isDark = true;
        b.innerHTML = '🌞'
    }
}