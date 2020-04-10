// JSON это формат обмена данными между пользователем и сервером, который пришел на смену XML. 
// JSON  передает и получает данные в формате ключ:значение ввиде HTTP запроса (GET или POST). Все данные кроме цифр прописываются в двойных кавычках.
// Можно предавать любые типы данных
/* let options = {
    height: 1366,
    width: 768,
    background: 'red',
    font: {
        size: '16px',
        color: '#fff'
    }
};
console.log(JSON.stringify(options));  // преобразует значение JavaScript в строку JSON
// {"height":1366,"width":768,"background":"red","font":{"size":"16px","color":"#fff"}}

console.log(JSON.parse(JSON.stringify(options))); // разбирает строку JSON в JavaScript  

 */

// AJAX  - технология обмена данными между пользователем и сервером без перезагрузки страницы браузера



let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

inputRub.addEventListener('input', () => {
    let request = new XMLHttpRequest();  // Это главный объект для работы с AJAX запросами. У него есть свои методы и свойства
    // request.open(method, url,async, login, pass)// method тип запроса (get или post)/ url  путь к серверу (может быть как адрес сервера, так и путь к локаальному файлу json)
    // async - отвечает за асинхронность обмена данными (по умолчанию true, если поставить false то браузер будет ждать ответа сервера).
    // login  и pass  - логин и пароль (если они необходимы)
    request.open('GET', 'current.json');
    // HTTP запросы состоят из header и body 
    request.setRequestHeader('Content-type', 'aplication/json; charset=utf-8');// setRequestHeader -метод настройки HTTP запроса
    //request.send(body); // send(body) метод передает тело HTTP запроса/  body есть только при передачи информации от клиента к серверу
    request.send(); // когда получаем данные то send() без аргументов

    // Ответы сервера    // https://msiter.ru/tutorials/javascript/js_ajax_http_response
    // status - в каком состоянии сейчас находится сервер (404, 200 и тп.)
    // stausText - ок  или nofound 
    // responseText или response - непосредственно ответ сервера (данные получаемые от сервера)
    // readyState  - возвращает текущее состояние запроса. Виды состояний смотри на mdn web docs

    // Событие, ответ сервера, получение ответа сервера и информации
    request.addEventListener('readystatechange', () => { // readystatechange(реагирует на изменение состояния запроса) более гибкое чем load, тк получая разные ответы можно поразному настраивать скрипт. Если гибкая настройка не нужна можно использовать load
        let requestserver = ()=> {
            return new Promise(function (resolve, reject) {
                if (request.readyState === 4 && request.status == 200) {
                    let data = JSON.parse(request.response);  // response - данные переданные в ответе сервера

                    resolve(data); // usd это ключ объекта полученного в ответе от сервера(или из локального файла )
                }
                else { reject(request.statusText); }// Если нет, то реджектим ошибку

            });
        };
        requestserver()
            .then(data => {inputUsd.value = (inputRub.value / data.usd).toFixed(3)})    // в стрелочной функции можно не писать круглых скобок если указываешь аргумент
            .catch(error => {inputUsd.value = ('Произошла ошибка. Код ошибки:' + error)});
    });



});
