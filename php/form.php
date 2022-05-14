<?php
 const TOKEN = '5399772680:AAGlsM2Qz_BqWllETK4IZ5oDPZXINsU5Ndg';
 const CHATID = '681767631';

// преобразуем массив в объект
$req = (object) $_REQUEST;

// отправляем заголовок типа JSON
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $textSendStatus = '';
// Проверяем не пусты ли обязательные поля
  if (!empty($_POST['name']) && !empty($_POST['tel'])) {

    // Если не пустые, то валидируем эти поля и сохраняем и добавляем в тело сообщения
    $txt = "Новая заявка с сайта %0A";

    // Имя
    if (isset($_POST['name']) && !empty($_POST['name'])) {
      $txt .= "Имя пославшего: " . strip_tags(trim(urlencode($_POST['name']))) . "%0A";
    }

    // Номер телефона
    if (isset($_POST['tel']) && !empty($_POST['tel'])) {
      $txt .= "Телефон: <a href='tel:+79785849379'>" . strip_tags(trim(urlencode($_POST['tel']))) . "</a>%0A";
    }

   // Email
     if (isset($_POST['email']) && !empty($_POST['email'])) {
       $txt .= "Email: " . strip_tags(trim(urlencode($_POST['email']))) . "%0A";
     }

     // Услуга
     if (isset($_POST['service']) && !empty($_POST['service'])) {
       $txt .= "Услуга: " . strip_tags(trim(urlencode($_POST['service']))) . "%0A";
     }
    // // Комментарий
     if (isset($_POST['comment']) && !empty($_POST['comment'])) {
       $txt .= "Комментарий: " . strip_tags(trim(urlencode($_POST['comment']))) . "%0A";
      }

    $textSendStatus = @file_get_contents('https://api.telegram.org/bot'. TOKEN .'/sendMessage?chat_id=' . CHATID . '&parse_mode=html&text=' . $txt);
    echo json_encode('SUCCESS');
  } else {
    echo json_encode('ERROR');
  }
}