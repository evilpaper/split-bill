
const app = document.querySelector(".sp__device");

// DISPLAYS
const totalDisplay = app.querySelector(".sp__display--total-amount");
const billDisplay = app.querySelector(".sp__display--bill-amount");
const friendsDisplay = app.querySelector(".sp__display--friends");
const tipAmountDisplay = app.querySelector(".sp__display--tip-amount");
const tipPercentageDisplay = app.querySelector(".sp__display--tip-percentage");
const friendsInSlider = app.querySelector(".sp__friends-number")

// INPUTS
const friendsSlider = app.querySelector(".sp__friends-slider");
const friendsMeter = app.querySelector(".sp__friends-meter");
const tipKeys = app.querySelector(".sp__tip-keys");
const numberKeys = app.querySelector(".sp__number-keys");


let bill = 0;
let tip = 0;
let whereofTip = 0;
let total = 0;

const getKeyType = (key) => {
  const { action } = key.dataset
  if (!action) return 'number'
  if (action === "clear") return 'clear'
  return action
}

const createTotalString = (key, displayNumber) => {
  const keyContent = key.textContent;
  const keyType = getKeyType(key)
  console.log(key)
  console.log(keyContent)
  console.log(displayNumber)
  if (keyType === "clear") {
    return "0";
  }
  if (keyType === "number") {
    if (displayNumber === "0") {
      return keyContent;
    }
    if (displayNumber !== "0") {
      if (displayNumber.length > 5) {
        return displayNumber;
      } else {
        return displayNumber + keyContent;
      }
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

const updateAppState = _ => {
  total = bill + bill * (tip / 100);
  whereofTip = bill * (tip / 100);
  totalDisplay.textContent = total.toFixed(0);
  tipAmountDisplay.textContent = whereofTip.toFixed(0);
};

const resetTip = _ => {
  tip = 0;
  Array.from(tipKeys.children).forEach(k => {
    k.classList.remove("is-selected");
  });
};

const handleFriendsInput = _ => {
  friendsDisplay.textContent = friendsSlider.value;
  friendsInSlider.textContent = friendsSlider.value;
  // friendsMeter.style.width = (friendsSlider.value - 2) / 8 * 100 + "%";
  // console.log("friendsSlider = " + friendsSlider.value)
  // console.log("friendsMeter.width = " + friendsMeter.style.width);
}

tipKeys.addEventListener("click", e => {
  const targetButton = e.target.closest('button') // Only target the button to avoid misfires
  if (targetButton) {
    const key = e.target.textContent;
    tip = parseFloat(key);
    tipPercentageDisplay.textContent = `(${key})`;
    updateVisualState(e.target);
    updateAppState();
  }
});

numberKeys.addEventListener("click", e => {
  const key = e.target.closest("button")
  if (key) {
    const currentNumberOnBillDisplay = billDisplay.textContent;
    billDisplay.textContent = createTotalString(key, currentNumberOnBillDisplay);
    bill = parseFloat(billDisplay.textContent);

    key.classList.add("run-push-animation");
    updateAppState();
  }
  key.addEventListener("animationend", function() {key.classList.remove("run-push-animation");});
});