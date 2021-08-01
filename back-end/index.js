const express = require('express');
const app = express();
const WSServer = require('express-ws')(app) // т.к. это функция, то передаем туда сразу наш сервер

// получаем объект, с помощью которого сможем делать широковещательную рассылку
const aWss = WSServer.getWss();

const PORT = process.env.PORT || 5000;


app.ws('/', (ws, req) => {
    console.log('---', 'ПОДКЛЮЧЕНИЕ УСТАНОВЛЕНО');

    // после подключения клиента отправим ему сообщение об успехе подключения
    ws.send('Ты успешно подключился')
    
    //логика отправки/обработки сообщений
    // 1 параметр - ТИП
    // 2 параметр функция обработки сообщения
    ws.on('message', (msg) => {
        console.log('---', 'msg2', JSON.parse(msg));

        msg = JSON.parse(msg)
        switch(msg.method) {
            case "connection":
                connectionHandler(ws, msg)
                break;
        }
    })
})

// запуск сервера
app.listen(PORT,() => console.log(`Server has been started on port ${PORT}`))


const connectionHandler = (ws, msg) => {
    // уникальный ID для каждого пользователя
    ws.id = msg.id;
    broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
    // широковещательная рассылка о том, что пользовател подключился

    // aWss.clients хранит все открытые вебсокеты на данный момент
    aWss.clients.forEach(client => {
        // сравниваем всех клиентов, если id равны, отправляем
        if(client.id === msg.id) {
            client.send(`Пользователь ${msg.username} подключился`)
        }
    })
}