let options = {
	weekday: "long",
	week: "numeric",
	year: "numeric",
};

let addDate = document.querySelectorAll(".item__date");
let collToArray = Array.from(addDate);

collToArray.map((item) => {
	const dateText = new Date(item.innerHTML);
	let weekNumber = getWeekNumber(dateText); // Вызов функции для получения номера недели
	let output = `${weekNumber} неделя, ${getMonthName(
		dateText
	)} ${dateText.toLocaleString("ru", { year: "numeric" })} года`;
	console.log(output);
	return (item.innerHTML = output);
});

// Функция для определения склонения месяца
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

// Функция для определения номера недели
function getWeekNumber(date) {
	const onejan = new Date(date.getFullYear(), 0, 1);
	const weekNumber = Math.ceil(
		((date - onejan) / 86400000 + onejan.getDay() + 1) / 7
	);
	return weekNumber;
}

// Обработчик клика на кнопку "Купить"
const buyButtons = document.querySelectorAll(".item__button");
buyButtons.forEach((button) => {
  button.addEventListener("click", openPurchaseForm);
});

// Открыть форму покупки
function openPurchaseForm(event) {
  const item = event.currentTarget.closest(".item");
  const itemTitle = item.querySelector(".item__title").textContent;
  const purchaseForm = document.getElementById("purchaseForm");
  purchaseForm.style.display = "flex";

  // Очистить предыдущий selectedCardInfo, если есть
  clearSelectedCardInfo();

  // Заполнить информацию о выбранном товаре
  const selectedCardInfo = document.createElement("h3");
  selectedCardInfo.textContent = `Выбрано: ${itemTitle}`;
  const form = document.querySelector("#form");
  form.insertBefore(selectedCardInfo, form.firstChild);

  // Сохранить ссылку на selectedCardInfo в объекте purchaseForm
  purchaseForm.selectedCardInfo = selectedCardInfo;

  // Добавить обработчик клика на purchaseForm
  purchaseForm.addEventListener("click", handlePurchaseFormClick);
}

// Закрыть форму покупки
function closePurchaseForm() {
  const purchaseForm = document.getElementById("purchaseForm");
  purchaseForm.style.display = "none";

  // Очистить selectedCardInfo при закрытии
  clearSelectedCardInfo();

  // Удалить обработчик клика на purchaseForm
  purchaseForm.removeEventListener("click", handlePurchaseFormClick);
}

// Очистить предыдущий selectedCardInfo, если есть
function clearSelectedCardInfo() {
  const purchaseForm = document.getElementById("purchaseForm");
  if (purchaseForm.selectedCardInfo) {
    purchaseForm.selectedCardInfo.remove();
    purchaseForm.selectedCardInfo = null;
  }
}

// Обработчик клика на purchaseForm
function handlePurchaseFormClick(event) {
  const targetElement = event.target;
  const formElement = document.getElementById("form");

  // Проверить, является ли клик внутри formElement
  if (formElement.contains(targetElement)) {
    // Клик внутри формы - не закрывать purchaseForm
    event.stopPropagation();
  } else {
    // Клик вне формы - закрыть purchaseForm
    closePurchaseForm();
  }
}

