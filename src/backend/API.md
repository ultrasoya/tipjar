# API Documentation

## Endpoints

### 1. Health Check
**GET** `/health`

Проверка состояния сервера.

**Response:**
```json
"OK"
```

**Использование:** Мониторинг, проверка доступности сервера.

---

### 2. Donations List
**GET** `/donationsList`

Получение списка последних донатов из subgraph.

**Response:**
```json
{
  "donations": [
    {
      "id": "donation_id",
      "donor": "0x...",
      "name": "Имя донатера",
      "message": "Сообщение"
    }
  ]
}
```

**Использование:** Отображение истории донатов на фронтенде.

---

### 3. Donations Amount
**GET** `/donationsAmount`

Получение общей суммы всех донатов из смарт-контракта.

**Response:**
```json
{
  "message": "Contract connected successfully",
  "totalDonations": "1.5"
}
```

**Использование:** Отображение общей суммы собранных средств.

---

### 4. Events (Server-Sent Events)
**GET** `/events`

Подписка на уведомления о новых донатах в реальном времени.

**Headers:**
```
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
```

**Response:**
```
data: {"donor":"0x...","name":"Имя","message":"Сообщение","amount":"0.1","history":[...]}

data: {"donor":"0x...","name":"Имя","message":"Сообщение","amount":"0.05","history":[...]}
```

**Использование:** Обновление UI в реальном времени при новых донатах.

## Как это работает

1. **Фронтенд** подключается к `/events` для получения уведомлений
2. **Слушатель** отслеживает события `NewDonation` в блокчейне
3. При новом донате:
   - Получает данные из subgraph
   - Отправляет уведомление через SSE
   - Обновляет общую сумму

## Примеры использования

### JavaScript (фронтенд)
```javascript
// Подписка на события
const eventSource = new EventSource('/events');
eventSource.onmessage = (event) => {
    const donation = JSON.parse(event.data);
    console.log('Новый донат:', donation);
};

// Получение списка донатов
fetch('/donationsList')
    .then(response => response.json())
    .then(data => console.log('Донаты:', data.donations));

// Получение общей суммы
fetch('/donationsAmount')
    .then(response => response.json())
    .then(data => console.log('Общая сумма:', data.totalDonations));
```

### cURL
```bash
# Проверка здоровья
curl http://localhost:30000/health

# Список донатов
curl http://localhost:30000/donationsList

# Общая сумма
curl http://localhost:30000/donationsAmount

# Подписка на события
curl -N http://localhost:30000/events
```
