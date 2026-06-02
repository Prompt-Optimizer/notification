# notification

Transactional email notification service. Consumes events from the shared RabbitMQ exchange and sends emails via Brevo (SendInBlue) — registration confirmations, optimization results, etc.

## Stack

- NestJS + Fastify
- RabbitMQ `shared-rabbitmq` — consumes `q.notification.email` from `ex.notification` (topic)
- Brevo SDK (transactional email)

## Setup

```bash
cp .env.dist .env
# fill in BREVO_API_KEY
npm install
```

Start infrastructure first:

```bash
cd ../local-infra && docker compose up -d
```

## Run

```bash
npm run start:dev   # development
npm run start:prod  # production
```

## Key env vars

| Variable | Description |
|---|---|
| `RMQ_URL` | `amqp://admin:password@localhost:5673` |
| `RMQ_EXCHANGE_NAME` | `ex.notification` |
| `RMQ_QUEUE_NAME` | `q.notification.email` |
| `BREVO_API_KEY` | Brevo API key |
| `BREVO_SENDER_EMAIL` | From address (e.g. `noreply@promptoptimizer.com`) |
| `BREVO_SENDER_NAME` | From name |
