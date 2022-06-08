var numbers = [0,0];
var currentOperand = '';
var workString = '';
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
    if (currentOperand!=''){equals()}
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
    if (split[0]=='') {split.shift(); split[0] = "-"+split[0]}
    numbers[0] = parseFloat(split[0])
    numbers[1] = parseFloat(split[1])
    let result = 0;
    let roundTo = split[0].length + split[1].length+1;

    switch (currentOperand){
        case '+': result = numbers[0] + numbers[1]; break;
        case '-': result = numbers[0] - numbers[1]; break;
        case '*': result = numbers[0] * numbers[1]; break;
        case '/': result = numbers[0] / numbers[1]; break;
        case '^': result = Math.pow(split[0],split[1]);
                  roundTo = Math.min(split[0].length * split[1].length, 100); break;
        default: result = numbers[0];
    }

    result = result.toPrecision(roundTo);
    result = parseFloat(result.replace(/[0]+$/,''))//Cut trailing 0's
    numbers[0] = result;
    workString = result+'';
    currentOperand = '';

    if (isNaN(workString)===true) {workString = "Chyba"}
    isFinal = true;
    updateDisplay();
}
var isDark = true;
function darkMode(){
    var ico = document.querySelector("#favicon");
    var a = document.documentElement.style;
    var b = document.querySelector("#darkmode")
    if (isDark){
        //Light mode
        a.setProperty("--main-bg-color", "#F7ECE1")
        a.setProperty("--calculator-bg-color", "#8D86C9")
        a.setProperty("--button-bg-color", "#242038")
        a.setProperty("--hover-bg-color", "#433C68")
        a.setProperty("--footer-bg-color","#000000")
        ico.setAttribute("href","favicon_blue.png")
        isDark = false;
        b.innerHTML = '🌙'
    } else {
        //Dark mode
        a.setProperty("--main-bg-color", "#1F1C22")
        a.setProperty("--calculator-bg-color", "#D72638")
        a.setProperty("--button-bg-color", "#69121A")
        a.setProperty("--hover-bg-color", "#8C1823")
        a.setProperty("--footer-bg-color","#ffffff")
        ico.setAttribute("href","favicon_red.png")
        isDark = true;
        b.innerHTML = '🌞'
    }
}
