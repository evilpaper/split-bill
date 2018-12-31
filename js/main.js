const app = document.querySelector(".sp__device");
const totalDisplay = app.querySelector(".sp__display--total-amount");
const billDisplay = app.querySelector(".sp__display--bill-amount");
const friendsDisplay = app.querySelector(".sp__display--friends");
const tipAmountDisplay = app.querySelector(".sp__display--tip-amount");
const tipPercentageDisplay = app.querySelector(".sp__display--tip-percentage");
const friends = app.querySelector(".sp__friends-slider");
const friendsMeter = app.querySelector(".sp__friends-meter");
const tip_keys = app.querySelector(".sp__tip-keys");
const number_keys = app.querySelector(".sp__number-keys");

let bill = 0;
let tip = 0;
let whereofTip = 0;
let total = 0;

console.log("Hello, at least the consoel is working.");

const createTotalString = (key, displayNumber) => {
  if (key === "C") {
    return (displayNumber = 0);
  }
  if (displayNumber === "0") {
    return key;
  }
  if (displayNumber !== "0") {
    if (displayNumber.length > 5) {
      return displayNumber;
    } else {
      return displayNumber + key;
    }
  }
};

const updateVisualState = key => {
  Array.from(key.parentNode.children).forEach(k => {
    k.classList.remove("is-selected");
    }
  );
  key.classList.add("is-selected");
};

const updateState = _ => {
  total = bill + bill * (tip / 100);
  whereofTip = bill * (tip / 100);
  totalDisplay.textContent = total.toFixed(0);
  tipAmountDisplay.textContent = whereofTip.toFixed(0);
};

const resetTip = _ => {
  tip = 0;
  Array.from(tip_keys.children).forEach(k => {
    k.classList.remove("is-selected");
  });
};

/*
friends.addEventListener("move", e => {
  friendsDisplay.textContent = e.target.value;
  console.log("e.target.value")
});
*/

function handleFriendsInput() {
  console.log(friends.value)
  friendsDisplay.textContent = friends.value;
  friendsMeter.style.width = friends.value / 10 * 100 - 2 + "%"
}

tip_keys.addEventListener("click", e => {
  const targetButton = e.target.closest('button') // Only target the button to avoid misfires
  if (targetButton) {
    const key = e.target.textContent;
    tip = parseFloat(key);
    tipPercentageDisplay.textContent = `(${key})`;
    updateVisualState(e.target);
    updateState();
  }
});

number_keys.addEventListener("click", e => {
  const targetKey = e.target.closest("button")
  console.log(targetKey)
  if (targetKey) {
    targetKey.classList.add("run-push-animation");
    const key = e.target.textContent;
    const currentNumberOnBillDisplay = billDisplay.textContent;
    const updatedNumber = createTotalString(key, currentNumberOnBillDisplay);
    billDisplay.textContent = updatedNumber;
    bill = parseFloat(billDisplay.textContent);
    updateState();
  }
  targetKey.addEventListener("animationend", function() {targetKey.classList.remove("run-push-animation");});
});