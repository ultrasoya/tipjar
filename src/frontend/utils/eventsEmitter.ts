import type { NewDonationEvent } from '@shared/types/contracts';

const eventsEmitter = () => {
    const eventSource = new EventSource("/api/events");
    
    eventSource.onmessage = (event) => {
        try {
            const data: NewDonationEvent = JSON.parse(event.data);
            console.log('🔥 New donation received:', data);
            
            // Здесь можно добавить логику для показа уведомлений
            // Например, показать toast или обновить состояние
        } catch (error) {
            console.error('Error parsing event data:', error);
        }
    };
    
    eventSource.onerror = (error) => {
        console.error('EventSource error:', error);
        eventSource.close();
    };
    
    // Возвращаем функцию для закрытия соединения
    return () => {
        eventSource.close();
    };
};

export default eventsEmitter;