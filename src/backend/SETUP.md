# Пошаговая настройка бэкенда

## 1. Создание файла .env

Создайте файл `.env` в корне директории бэкенда (`src/backend/`) со следующим содержимым:

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

## 2. Получение необходимых ключей

### Subgraph API
1. Перейдите на [The Graph Studio](https://studio.thegraph.com/)
2. Создайте новый subgraph или используйте существующий
3. Скопируйте URL и API ключ

### Alchemy API
1. Перейдите на [Alchemy](https://www.alchemy.com/)
2. Создайте новый проект
3. Скопируйте API ключ

### Контракт
1. Разверните ваш смарт-контракт в сети Sepolia
2. Скопируйте адрес контракта

## 3. Проверка конфигурации

```bash
npm run check-env
```

## 4. Запуск

```bash
npm run dev
```

## Устранение неполадок

### Ошибка "environment variable is not defined"
- Убедитесь, что файл `.env` создан в правильной директории
- Проверьте, что все переменные заполнены
- Перезапустите сервер после изменения `.env`

### Ошибка подключения к блокчейну
- Проверьте правильность `ALCHEMY_API_KEY`
- Убедитесь, что используете правильную сеть (Sepolia)

### Ошибка подключения к subgraph
- Проверьте правильность `SUBGRAPH_URL` и `SUBGRAPH_API_KEY`
- Убедитесь, что subgraph синхронизирован
