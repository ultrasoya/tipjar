import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
    "SUBGRAPH_URL",
    "SUBGRAPH_API_KEY",
    "ALCHEMY_API_KEY",
    "DONATE_CONTRACT_ADDRESS"
];

const missingVars: string[] = [];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        missingVars.push(envVar);
    }
}

if (missingVars.length > 0) {
    console.error("❌ Отсутствуют обязательные переменные окружения:");
    missingVars.forEach(varName => {
        console.error(`   - ${varName}`);
    });
    console.error("\nСоздайте файл .env в корне директории бэкенда.");
    process.exit(1);
}

console.log("✅ Все обязательные переменные окружения настроены корректно!");

console.log("\n📋 Текущая конфигурация:");
console.log(`   Порт сервера: ${process.env["PORT"] || 3000}`);
console.log(`   Subgraph URL: ${process.env["SUBGRAPH_URL"]}`);
console.log(`   Контракт: ${process.env["DONATE_CONTRACT_ADDRESS"]}`);
console.log(`   RPC провайдер: Alchemy (${process.env["ALCHEMY_API_KEY"] ? "настроен" : "не настроен"})`);
