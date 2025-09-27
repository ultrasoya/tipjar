import type { NewDonationEvent } from '@shared/types/contracts';

const eventsEmitter = () => {
    const eventSource = new EventSource("/api/events");
    
    eventSource.onmessage = (event) => {
        try {
            const data: NewDonationEvent = JSON.parse(event.data);
            console.log('🔥 New donation received:', data);
            
        } catch (error) {
            console.error('Error parsing event data:', error);
        }
    };
    
    eventSource.onerror = (error) => {
        console.error('EventSource error:', error);
        eventSource.close();
    };
    
    return () => {
        eventSource.close();
    };
};

export default eventsEmitter;