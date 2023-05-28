let options = {
	weekday: "long",
	week: "numeric",
	year: "numeric",
};

let addDate = document.querySelectorAll(".item__date");
let collToArray = Array.from(addDate);

collToArray.map((item) => {
  const dateText = new Date(item.innerHTML);
  const weekNumber = getWeekNumber(dateText);
  const dayOfWeek = getDayOfWeek(dateText);
  const output = `${dayOfWeek}, ${weekNumber} неделя ${getMonthName(
    dateText
  )} ${dateText.toLocaleString("ru", { year: "numeric" })} года`;
  return (item.innerHTML = output);
});

function getDayOfWeek(date) {
  const options = { weekday: "long" };
  return date.toLocaleString("ru", options);
}

function getMonthName(date) {
	const monthNames = [
		"января",
		"февраля",
		"марта",
		"апреля",
		"мая",
		"июня",
		"июля",
		"августа",
		"сентября",
		"октября",
		"ноября",
		"декабря",
	];
	const monthIndex = date.getMonth();
	return monthNames[monthIndex];
}

function getWeekNumber(date) {
	const onejan = new Date(date.getFullYear(), 0, 1);
	const weekNumber = Math.ceil(
		((date - onejan) / 86400000 + onejan.getDay() + 1) / 7
	);
	return weekNumber;
}

const buyButtons = document.querySelectorAll(".item__button");
buyButtons.forEach((button) => {
  button.addEventListener("click", openPurchaseForm);
});

function openPurchaseForm(event) {
  const item = event.currentTarget.closest(".item");
  const itemTitle = item.querySelector(".item__title").textContent;
  const purchaseForm = document.getElementById("purchaseForm");
  purchaseForm.classList.add("fadeIn");

  const body = document.getElementById("body");
  body.classList.add('js-no-scroll');

  clearSelectedCardInfo();

  const selectedCardInfo = document.createElement("h3");
  selectedCardInfo.textContent = `Выбрано: ${itemTitle}`;
  const form = document.querySelector("#form");
  form.insertBefore(selectedCardInfo, form.firstChild);

  purchaseForm.selectedCardInfo = selectedCardInfo;

  purchaseForm.addEventListener("click", handlePurchaseFormClick);

  form.addEventListener("submit", handleFormSubmit);

  resetForm(form);
}

function closePurchaseForm() {
  const purchaseForm = document.getElementById("purchaseForm");
  purchaseForm.classList.remove("fadeIn");
  const body = document.getElementById("body");
  body.classList.remove('js-no-scroll');

  clearSelectedCardInfo();

  purchaseForm.removeEventListener("click", handlePurchaseFormClick);
}

function clearSelectedCardInfo() {
  const purchaseForm = document.getElementById("purchaseForm");
  if (purchaseForm.selectedCardInfo) {
    purchaseForm.selectedCardInfo.remove();
    purchaseForm.selectedCardInfo = null;
  }
}

function handlePurchaseFormClick(event) {
  const targetElement = event.target;
  const formElement = document.getElementById("form");

  if (formElement.contains(targetElement)) {
    event.stopPropagation();
  } else {
    closePurchaseForm();
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  alert("Спасибо за покупку!");
  closePurchaseForm();
}

function resetForm(form) {
  form.reset();
}

function checkScrollPosition() {
  const scrollToTopButton = document.getElementById("scrollToTopButton");
  if (window.scrollY > 0) {
    scrollToTopButton.classList.add("show");
  } else {
    scrollToTopButton.classList.remove("show");
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

window.addEventListener("scroll", checkScrollPosition);

function toggleJumpingAnimation() {
  const scrollToTopButton = document.getElementById("scrollToTopButton");
  const themeSwitch = document.getElementById("switch");
  scrollToTopButton.classList.toggle("jumping");
  themeSwitch.classList.toggle("jumping");
}

setInterval(toggleJumpingAnimation, 3000);


const smoothScrollLinks = document.querySelectorAll('.smooth-scroll-link');

smoothScrollLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();

    const targetId = this.getAttribute('href').substring(1);

    scrollToAnchor(targetId);
    menu.classList.remove("open");
    burgerBtn.classList.remove("open");
  });
});

function scrollToAnchor(targetId) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
}

const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('change', function() {
  if (this.checked) {
    document.documentElement.style.setProperty('--main-text-color', '#fff');
    document.documentElement.style.setProperty('--main-bg-color', '#333');
    document.documentElement.style.setProperty('--secondary-bg-color', '#715f5f');
  } else {
    document.documentElement.style.setProperty('--main-text-color', '#333');
    document.documentElement.style.setProperty('--main-bg-color', '#fbf8ec');
    document.documentElement.style.setProperty('--secondary-bg-color', '#fff');
  }
});

const burgerBtn = document.getElementById("burgerBtn");
const menu = document.querySelector(".nav");

burgerBtn.addEventListener("click", function() {
  const body = document.getElementById("body");
  body.classList.toggle('js-no-scroll');
	menu.classList.toggle("open");
	burgerBtn.classList.toggle("open");
});