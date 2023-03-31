const btnNumbers = document.querySelectorAll("[btn-number]");
const btnOperations = document.querySelectorAll("[btn-operand]");
const btnClear = document.querySelector("[btn-clear]");
const btnDelete = document.querySelector("[btn-delete]");
const btnEquals = document.querySelector("[btn-equals]");
const prevOperandElement = document.querySelector("[prev-operand-element]");
const currOperandElement = document.querySelector("[curr-operand-element]");

class Calculator {
  constructor(prevOperandElement, currOperandElement) {
    this.prevOperandElement = prevOperandElement;
    this.currOperandElement = currOperandElement;
    this.clearDisplayHandler();
  }

  clearDisplayHandler() {
    this.currOperand = "";
    this.prevOperand = "";
    this.operation = undefined;
    this.updateCalcDisplayHandler();
  }

  deleteNumHandler() {
    this.currOperand = this.currOperand.toString().slice(0, -1);
  }

  equalsBtnHandler() {}

  addNumberHandler(number) {
    if (number === "." && this.currOperand.includes(".")) return; // if the display already has a . it will not add an additional
    this.currOperand = this.currOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currOperand === "") return; // if current operator is empty, it will not update previous operand
    if (this.prevOperand !== "") {
      this.calculateOperationHandler();
    }
    this.operation = operation;
    this.prevOperand = this.currOperand;
    this.currOperand = "";
  }

  calculateOperationHandler() {
    let calculationResult;
    const prev = parseFloat(this.prevOperand);
    const curr = parseFloat(this.currOperand);

    switch (this.operation) {
      case "+":
        calculationResult = prev + curr;
        break;
      case "-":
        calculationResult = prev - curr;
        break;
      case "X":
        calculationResult = prev * curr;
        break;
      case "/":
        calculationResult = prev / curr;
        break;
      default:
        return;
    }
    this.currOperand = calculationResult;
    this.operation = undefined;
    this.prevOperand = "";
  }

  updateCalcDisplayHandler() {
    this.currOperandElement.innerText = this.currOperand;
    if (this.operation) {
      this.prevOperandElement.innerText = `${this.prevOperand} ${this.operation}`;
    } else {
      this.prevOperandElement.innerText = "";
    }
  }
}

const calculator = new Calculator(prevOperandElement, currOperandElement);

btnNumbers.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.addNumberHandler(button.innerText);
    calculator.updateCalcDisplayHandler();
  });
});

btnOperations.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateCalcDisplayHandler();
  });
});

btnEquals.addEventListener("click", (button) => {
  calculator.calculateOperationHandler();
  calculator.updateCalcDisplayHandler();
});

btnDelete.addEventListener("click", (button) => {
  calculator.deleteNumHandler();
  calculator.updateCalcDisplayHandler();
});

btnClear.addEventListener("click", (button) => {
  calculator.clearDisplayHandler();
  calculator.updateCalcDisplayHandler();
});
