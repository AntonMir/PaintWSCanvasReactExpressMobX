const btn = document.getElementById('btn');

// новый экземпляр вебсокента и указываем на наш бэк
const socket = new WebSocket('ws://localhost:5000/')

// если мы успешно подключились к бэфку, то выводим функцию
socket.onopen = () => {
    // как только подключились, отправляем ответ
    socket.send(JSON.stringify({ 
        method: 'connection',
        id: 555,
        username: 'Anton'
    }))
}

// обработаем входящее сообщения
socket.onmessage = (event) => {
    console.log('---', 'С сервера пришло сообщение');
    console.log('---', 'сообщение:', event.data);
}

// отправляем сообщение на бэфку
btn.onclick = () => {
    socket.send(JSON.stringify({ 
        message: 'Hello',
        method: 'message',
        id: 555,
        username: 'Anton'
    }))
}