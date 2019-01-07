
const app = document.querySelector(".sp__device");

// DISPLAYS

// NEW NAME SUGGESTIONS
// displayTotalPayable
// displayAmountOnBill
// displayNumberOfFriends
// displayTipAmount
// displayTipPercentage
// numberOfFriendsOnSliderDisplay

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

// See if you can refactor to remove these
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

  if (keyType === "clear") {
    return "$";
  }
  if (keyType === "add") {
    return displayNumber;;
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

const markSelectedKeyAsSelected = key => {
  Array.from(key.parentNode.children).forEach(k => {
    k.classList.remove("is-selected");
    }
  );
  key.classList.add("is-selected");
};

const updateAppState = _ => {
  bill = parseFloat(billDisplay.textContent);
  total = bill + bill * (tip / 100);
  whereofTip = bill * (tip / 100);
  totalDisplay.textContent = "$" + total.toFixed(0).toString();
  tipAmountDisplay.textContent = whereofTip.toFixed(0);
};

const resetTip = _ => {
  tip = 0;
  Array.from(tipKeys.children).forEach(k => {
    k.classList.remove("is-selected");
  });
};

const updateFriendsNumberOnDisplays = _ => {
  const friendsToBeAdded = friendsSlider.value - 2;
  friendsDisplay.textContent = friendsSlider.value;
  friendsInSlider.textContent = friendsSlider.value;
  friendsInSlider.classList.add("run-push-animation");
  friendsInSlider.addEventListener("animationend", function() {friendsInSlider.classList.remove("run-push-animation");});
  updateFriendsIcons(friendsToBeAdded);
}

const updateFriendsIcons = (friends) => {
  const friendsContainer = app.querySelector(".sp__friends-icon-container")
  const dynamicFriendsElements = app.querySelectorAll(".dynamic");
  const friendsToBeRemoved = [...dynamicFriendsElements]

  friendsToBeRemoved.forEach(friend => {
    friendsContainer.removeChild(friend)
  })

  for (let index = 0; index < friends; index++) {
    const friendElement = `<img class="sp__friends-icon-small dynamic run-small-push-animation" src="img/small_user.svg" alt="Friends icon">`;
    friendsContainer.insertAdjacentHTML('beforeend', friendElement);

  }
}

tipKeys.addEventListener("click", e => {
  const targetButton = e.target.closest('button')
  if (targetButton) {
    const key = e.target.textContent;
    tip = parseFloat(key);
    tipPercentageDisplay.textContent = `(${key})`;
    markSelectedKeyAsSelected(e.target);
    updateAppState();
  }
});

numberKeys.addEventListener("click", e => {
  const key = e.target.closest("button")
  if (key) {
    const currentNumberOnBillDisplay = billDisplay.textContent;
    billDisplay.textContent = createTotalString(key, currentNumberOnBillDisplay);
    updateAppState();
    key.classList.add("run-push-animation");
  }
  key.addEventListener("animationend", function() {key.classList.remove("run-push-animation");});
});