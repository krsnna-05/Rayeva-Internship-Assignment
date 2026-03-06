# AI Commerce Automation Tools

AI-powered backend services for automating **product categorization** and generating **sustainability proposals for businesses**.

This project demonstrates how **LLMs can be integrated into backend systems** to automate catalog management and assist businesses transitioning to eco-friendly alternatives.

---

# Overview

The system provides two AI-powered modules:

1. **AI Auto Category & Tag Generator**
2. **AI B2B Proposal Generator**

These tools simulate functionality that might exist inside a **sustainable products marketplace platform**.

Example use cases:

- Automatically categorize newly uploaded products
- Generate sustainability proposals for businesses switching to eco-friendly alternatives

---

# Architecture

```
React Frontend
      ↓
Express + TypeScript Backend
      ↓
AI Service Layer
      ↓
Local LLM (Ollama - ministral)
      ↓
Structured JSON Response
```

Key design decisions:

- Backend handles **AI orchestration**
- AI responses are **validated using schemas**
- System uses **local LLM inference (Ollama)** for cost efficiency
- Products are stored in the database while **AI outputs are generated dynamically**

---

# Features

## AI Auto Category Generator

Automatically generates product metadata.

Input:

- Product name
- Product description

AI Output:

- Primary category
- Sub category
- SEO tags
- Sustainability attributes

Example:

```
Input:
"Bamboo Toothbrush"

Output:
Category: Personal Care
Subcategory: Oral Care
Tags: eco-friendly, biodegradable
Attributes: plastic-free
```

Benefits:

- improves product discoverability
- enables better filtering and search
- automates catalog classification

---

## AI B2B Proposal Generator

Generates sustainability proposals for businesses.

Input:

- client name
- budget
- event size
- sustainability goal

Example input:

```
Client: EcoCafe
Budget: $2000
Event size: 1000 customers
Goal: Plastic-free takeaway packaging
```

AI generates:

- recommended eco products
- estimated quantities
- cost breakdown
- environmental impact summary
- additional recommendations

Example output:

```
Products:
- Bagasse Food Containers (1000)
- Compostable Cups (1000)

Estimated Cost: $1600

Impact:
Switching to compostable packaging eliminates ~30kg of plastic waste.
```

---

# API Endpoints

### Health Check

```
GET /api/v1/health
```

Returns service status.

---

### Product Management

Create a new product.

```
POST /api/v1/products
```

Request:

```json
{
  "name": "Bamboo Toothbrush",
  "description": "Eco-friendly bamboo toothbrush"
}
```

---

List all products.

```
GET /api/v1/products
```

---

Get single product.

```
GET /api/v1/products/:id
```

---

### AI Category Generation

Generate product metadata.

```
POST /api/v1/ai/category
```

Request:

```json
{
  "product_name": "Bamboo Toothbrush",
  "product_description": "Eco-friendly biodegradable toothbrush"
}
```

Response:

```json
{
  "primary_category": "Personal Care",
  "sub_category": "Oral Care",
  "seo_tags": ["bamboo toothbrush", "eco toothbrush"],
  "sustainability_attributes": ["biodegradable", "plastic-free"]
}
```

---

### AI Proposal Generator

Generate sustainability proposal.

```
POST /api/v1/ai/proposal
```

Request:

```json
{
  "client_name": "EcoCafe",
  "budget": 2000,
  "event_size": 1000,
  "goal": "Plastic-free takeaway packaging"
}
```

Response:

```json
{
  "products": [
    {
      "name": "Bagasse Food Containers",
      "quantity": 1000,
      "estimated_cost": 900
    }
  ],
  "budget_used": 1600,
  "impact_summary": "Switching to compostable packaging eliminates ~30kg plastic waste."
}
```

---

# Project Structure

```
backend
│
├ routes
│   ├ ai.routes.ts
│   └ product.routes.ts
│
├ controllers
│   ├ category.controller.ts
│   └ proposal.controller.ts
│
├ services
│   ├ category.service.ts
│   └ proposal.service.ts
│
├ ai
│   ├ prompts
│   │   ├ categoryPrompt.ts
│   │   └ proposalPrompt.ts
│   │
│   └ schemas
│       ├ categorySchema.ts
│       └ proposalSchema.ts
│
├ utils
│   └ aiClient.ts
│
└ server.ts
```

---

# Tech Stack

Backend

- Node.js
- Express
- TypeScript

AI

- Ollama
- Mistral / Ministral models

Validation

- Zod (schema validation)

Frontend

- React

---

# Local Development

### Install dependencies

```
npm install
```

---

### Start Ollama

Install Ollama:

```
https://ollama.com
```

Run model:

```
ollama run ministral
```

---

### Run backend server

```
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

# Example Workflow

### 1 Upload Product

```
POST /products
```

User submits:

```
Bamboo Toothbrush
```

AI generates:

```
Category
Tags
Sustainability attributes
```

Product stored in database.

---

### 2 Generate Business Proposal

Client submits:

```
EcoCafe
Plastic-free packaging
Budget $2000
```

AI generates sustainability proposal.

---

# Future Improvements

Possible system extensions:

- AI image product classification
- vector search for product recommendations
- proposal history storage
- sustainability impact calculator
- admin dashboard

---

# Author

Krishna Gavali
Full Stack Developer | AI Application Developer

---

If you want, I can also generate a **much stronger README version that looks like a real startup project (with architecture diagrams and screenshots sections)**.
That version tends to **impress internship reviewers a lot more.**
