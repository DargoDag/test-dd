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
  let output = `${weekNumber} неделя, ${getMonthName(dateText)} ${dateText.toLocaleString("ru", { year: "numeric" })} года`;
  console.log(output);
  return (item.innerHTML = output);
});

// Функция для определения склонения месяца
function getMonthName(date) {
  const monthNames = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];
  const monthIndex = date.getMonth();
  return monthNames[monthIndex];
}

// Функция для определения номера недели
function getWeekNumber(date) {
  const onejan = new Date(date.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  return weekNumber;
}
