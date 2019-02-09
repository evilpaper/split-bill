// TODO
// Fix the friends icon animation

const app = document.querySelector(".sp__device");
const displayTotalAmount = app.querySelector(".sp__display--total-amount");
const displayBillAmount = app.querySelector(".sp__display--bill-amount");
const displayNumberOfFriends = app.querySelector(".sp__display--friends");
const displayTipAmount = app.querySelector(".sp__display--tip-amount");
const displayTipPercentage = app.querySelector(".sp__display--tip-percentage");
const sliderDisplayNumberOffFriends = app.querySelector(".sp__friends-number");
const splittedBillContainer = app.querySelector(".sp__splitted_bill-container");

const display = document.querySelector(".sp__display");
const sliderBlock = app.querySelector(".sp__friends-container");
const friendsSlider = app.querySelector(".sp__friends-slider");
const tipKeys = app.querySelector(".sp__tip-keys");
const numberKeys = app.querySelector(".sp__number-keys");
const splitBillKey = app.querySelector(".sp__split-button");
const splitBillEditPen = app.querySelector(".sp__split-button-pen");

const getKeyType = key => {
  const { action } = key.dataset;
  if (!action) return "number";
  if (action === "clear") return "clear";
  return action;
};

const createBillString = (key, billAmount) => {
  const keyContent = key.textContent;
  const keyType = getKeyType(key);
  const displayNumber = billAmount;

  if (keyType === "clear") {
    return "0";
  }
  if (keyType === "decimal") {
    if (displayNumber.includes(".")) return displayNumber;
    return displayNumber + ".";
  }
  if (keyType === "number") {
    if (displayNumber === "0") {
      return keyContent;
    }
    if (displayNumber.length > 7) {
      return displayNumber;
    }
    return displayNumber + keyContent;
  }
};

const createTipsString = () => {
  const bill = parseFloat(
    display.querySelector(".sp__display--bill-amount").textContent
  );
  const tip = parseFloat(
    display
      .querySelector(".sp__display--tip-percentage")
      .textContent.split("(")
      .join(" ")
      .split("%)")
      .join(" ")
  );
  return bill * (tip / 100) === Math.floor(bill * (tip / 100))
    ? bill * (tip / 100)
    : (bill * (tip / 100)).toFixed(2);
};

const createTotalString = _ => {
  const bill = parseFloat(displayBillAmount.textContent);
  const tip = parseFloat(displayTipAmount.textContent);
  const total = bill + tip;
  return "$" + total.toString();
};

const highlightSelectedKey = key => {
  Array.from(key.parentNode.children).forEach(k => {
    k.classList.remove("is-selected");
  });
  key.classList.add("is-selected");
};

const updateFriendsNumbers = _ => {
  const friendsToBeAdded = friendsSlider.value - 2;
  displayNumberOfFriends.textContent = friendsSlider.value;
  sliderDisplayNumberOffFriends.textContent = friendsSlider.value;
  sliderDisplayNumberOffFriends.classList.add("run-push-animation");
  sliderDisplayNumberOffFriends.addEventListener("animationend", function() {
    sliderDisplayNumberOffFriends.classList.remove("run-push-animation");
  });
  updateFriendsIcons(friendsToBeAdded);
};

const updateFriendsIcons = friends => {
  const friendsContainer = app.querySelector(".sp__friends-icon-container");

  const dynamicFriendsElements = app.querySelectorAll(".dynamic");
  const friendsToBeRemoved = [...dynamicFriendsElements];
  friendsToBeRemoved.forEach(friend => {
    friendsContainer.removeChild(friend);
  });

  const drawFriendsIcons = times => {
    if (times === 0) return;
    setTimeout(() => {
      const friendElement = `<img class="sp__friends-icon-small dynamic run-small-push-animation" src="img/small_user.svg" alt="Friends icon">`;
      friendsContainer.insertAdjacentHTML("beforeend", friendElement);
      drawFriendsIcons(times - 1);
    }, 50);
  };

  drawFriendsIcons(friends);
};

const createSplittedBill = _ => {
  const friends = [...Array(parseFloat(friendsSlider.value))];

  friends.forEach(friend => {
    const partOfBill = document.createElement("li");
    partOfBill.classList.add("sp__parts_of_bill");
    partOfBill.innerHTML = `
      <h3 class="sp__parts_of_bill-person">Person A</h3>
      <h2 class="sp__parts_of_bill-amount">$10</h2>
      `;
    splittedBillContainer.appendChild(partOfBill);
  });
};

const removeSplittedBill = _ => {
  splittedBillContainer.remove();
};

tipKeys.addEventListener("click", e => {
  const targetButton = e.target.closest("button");
  if (targetButton) {
    const key = e.target.textContent;
    tip = parseFloat(key);
    displayTipPercentage.textContent = `(${key})`;
    displayTipAmount.textContent = createTipsString();
    displayTotalAmount.textContent = createTotalString();
    highlightSelectedKey(e.target);
  }
});

numberKeys.addEventListener("click", e => {
  const key = e.target.closest("button");
  if (key) {
    const billAmount = displayBillAmount.textContent;
    displayBillAmount.textContent = createBillString(key, billAmount);
    displayTipAmount.textContent = createTipsString();
    displayTotalAmount.textContent = createTotalString(billAmount);
    key.classList.add("run-push-animation");
  }
  key.addEventListener("animationend", function() {
    key.classList.remove("run-push-animation");
  });
});

splitBillKey.addEventListener("click", e => {
  if (displayTotalAmount.textContent === "$0") return;

  if (sliderBlock.classList.contains("hidden")) {
    removeSplittedBill();
  } else {
    createSplittedBill();
  }

  splitBillKey.classList.toggle("shrinked");

  if (splitBillKey.classList.contains("shrinked")) {
    splitBillKey.innerHTML = "";
  } else {
    splitBillKey.innerHTML = "Split bill";
  }

  // Hide current content
  sliderBlock.classList.toggle("hidden");
  tipKeys.classList.toggle("hidden");
  numberKeys.classList.toggle("hidden");
  splitBillEditPen.classList.toggle("hidden");
});
