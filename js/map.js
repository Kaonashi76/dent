ymaps.ready(init);
function init () {
  const myMap = new ymaps.Map('map', {
      center: [44.585328, 33.442002],
      zoom: 17
  }, {
      searchControlProvider: 'yandex#search'
  });

  const myPlacemark = new ymaps.Placemark([44.585271, 33.442059], {
    // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
    balloonContentHeader: "Клиника DentLove",
    balloonContentBody: `
    <b>Рабочие часы:</b><br>
    пн-пт 9:00 - 17:00;<br>
    сб 9:00 - 16:00<br>
    <b>Запись по телефону:</b> <a href='tel:+79780330215'>+7 (978) 033 02 15</a><br>
    или на <a href='https://dentlove.ru/#form'>сайте</a>`,
});

  myMap.geoObjects.add(myPlacemark);

}