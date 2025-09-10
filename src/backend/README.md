# Backend Service

Сервис бэкенда для приложения Tipjar, предоставляющий API для работы с донатами и блокчейном.

## Установка

```bash
npm install
```

## Настройка переменных окружения

Создайте файл `.env` в корне директории бэкенда со следующими переменными:

```env
# Subgraph configuration
SUBGRAPH_URL=https://api.studio.thegraph.com/query/your-subgraph-id
SUBGRAPH_API_KEY=your-api-key-here

# Server configuration
PORT=3000

# Blockchain configuration
ALCHEMY_API_KEY=your-alchemy-api-key
DONATE_CONTRACT_ADDRESS=your-deployed-contract-address

# Alternative RPC configuration (if not using Alchemy)
RPC_URL=https://sepolia.infura.io/v3/your-project-id
PRIVATE_KEY=your-private-key-here
```

### Описание переменных:

- `SUBGRAPH_URL` - URL вашего subgraph для получения данных о донатах
- `SUBGRAPH_API_KEY` - API ключ для доступа к subgraph
- `PORT` - порт, на котором будет запущен сервер (по умолчанию 3000)
- `ALCHEMY_API_KEY` - API ключ Alchemy для взаимодействия с блокчейном
- `DONATE_CONTRACT_ADDRESS` - адрес развернутого смарт-контракта
- `RPC_URL` - альтернативный URL RPC провайдера (если не используете Alchemy)
- `PRIVATE_KEY` - приватный ключ для подписи транзакций

## Запуск

### Проверка конфигурации
```bash
npm run check-env
```

### Режим разработки
```bash
npm run dev
```

### Продакшн режим
```bash
npm run start
```

## API Endpoints

- `GET /health` - проверка состояния сервера
- `GET /donations/list` - список донатов
- `GET /donations/amount` - общая сумма донатов
- `GET /events` - события блокчейна

## Структура проекта

```
src/
├── index.ts              # Основной файл сервера
├── routes/               # API маршруты
├── services/             # Бизнес-логика
├── listeners/            # Слушатели событий
└── types/                # TypeScript типы
```
