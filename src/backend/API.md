# API Documentation

## Endpoints

### 1. Health Check

**GET** `/health`

Server health check.

**Response:**

```json
"OK"
```

**Usage:** Monitoring, checking server availability.

---

### 2. Donations List

**GET** `/donationsList`

Get list of recent donations from subgraph.

**Response:**

```json
{
  "donations": [
    {
      "id": "donation_id",
      "donor": "0x...",
      "name": "Donor Name",
      "message": "Message"
    }
  ]
}
```

**Usage:** Display donation history on frontend.

---

### 3. Donations Amount

**GET** `/donationsAmount`

Get total amount of all donations from smart contract.

**Response:**

```json
{
  "message": "Contract connected successfully",
  "totalDonations": "1.5"
}
```

**Usage:** Display total amount of collected funds.

---

### 4. Events (Server-Sent Events)

**GET** `/events`

Subscribe to real-time notifications about new donations.

**Headers:**

```
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
```

**Response:**

```
data: {"donor":"0x...","name":"Name","message":"Message","amount":"0.1","history":[...]}

data: {"donor":"0x...","name":"Name","message":"Message","amount":"0.05","history":[...]}
```

**Usage:** Real-time UI updates when new donations arrive.

## How it Works

1. **Frontend** connects to `/events` to receive notifications
2. **Listener** monitors `NewDonation` events on blockchain
3. When new donation occurs:
   - Fetches data from subgraph
   - Sends notification via SSE
   - Updates total amount

## Usage Examples

### JavaScript (Frontend)

```javascript
// Subscribe to events
const eventSource = new EventSource("/events");
eventSource.onmessage = (event) => {
  const donation = JSON.parse(event.data);
  console.log("New donation:", donation);
};

// Get donations list
fetch("/donationsList")
  .then((response) => response.json())
  .then((data) => console.log("Donations:", data.donations));

// Get total amount
fetch("/donationsAmount")
  .then((response) => response.json())
  .then((data) => console.log("Total amount:", data.totalDonations));
```

### cURL

```bash
# Health check
curl http://localhost:30000/health

# Donations list
curl http://localhost:30000/donationsList

# Total amount
curl http://localhost:30000/donationsAmount

# Subscribe to events
curl -N http://localhost:30000/events
```
