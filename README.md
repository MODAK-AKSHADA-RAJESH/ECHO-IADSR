# ECHO: Explainable Cognitive Denoising for Personalized Recommendations

> **Finally, algorithms that actually know you.**  
> ECHO uses cross-modal semantic analysis to separate genuine interest from behavioral noise, making algorithmic recommendations transparent and correctable.

## The Problem
Recommendation algorithms learn from *everything* you click — including the things you didn't mean (gifts, curiosity clicks, impulse browsing). This noisy data distorts your algorithmic profile, leading to irrelevant recommendations and contributing to filter bubbles.

## The ECHO Solution
ECHO is an end-to-end full-stack platform that implements a novel variant of the IADSR (Intent-Aware Denoising Sequential Recommendation) architecture:
1. **Lightweight Semantic Encoder:** Uses BAAI/bge-large-en-v1.5 to achieve near-SOTA accuracy with 24× fewer parameters than original implementations.
2. **Attention-Weighted Noise Scoring:** A novel attention mechanism autonomously learns whether to trust behavioral, semantic, or cross-modal signals for each interaction.
3. **Full-Stack Transparency:** A personalized Next.js web application that breaks down every recommendation into human-readable explanations.

## Three Perspectives, One System
ECHO is designed around three distinct user roles, each with a personalized interface:
- **👤 Shopper:** Consumers view their personal recommendations, taste profile, and a transparent history of which interactions the AI kept vs. filtered out.
- **🏢 Platform Manager:** Business analysts monitor platform-wide system health, average noise rates, and the aggregate impact of denoising on user retention.
- **🔬 Researcher:** ML engineers review performance metrics (HR/NDCG), baselines, and ablation studies.

## System Architecture

```text
Raw Interactions (Amazon Beauty Dataset)
       │
       ▼
[ BGE-Large Encoder ] ───────┐
(Extracts semantic meaning)  │
                             ▼
[ GRU4Rec Backbone ] ──▶ [ Cross-Modal Alignment ]
(Learns behavior)        (Identifies signal vs noise)
                             │
                             ▼
                     [ Attention-Weighted Masking ]
                     (Filters out one-off moments)
                             │
                             ▼
                  [ Denoised Recommendations ]
                             │
                             ▼
[ FastAPI Backend ] ──▶ [ Next.js 14 Frontend (3 Roles) ]
```

## Performance Results

| Model Configuration | HR@20 | NDCG@20 |
|---------------------|-------|---------|
| GRU4Rec (Baseline)  | 0.0390| 0.0143  |
| ECHO (Ours)         | **0.0427**| **0.0206** |
| Improvement         | +9.5% | +44%    |

## Installation & Deployment

ECHO is fully containerized with Docker Compose for single-command deployment.

### Option 1: Docker (Recommended)
Make sure Docker Desktop is running.
```bash
docker compose up --build
```
- Frontend: `http://localhost:3000`
- Backend API Docs: `http://localhost:8000/docs`

### Option 2: Local Development
**Terminal 1 (Backend):**
```bash
pip install -r requirements_app.txt
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000`

## Authors & Acknowledgments
Built for IT549: Deep Learning (April 2026).
Dataset: Amazon Beauty Product Reviews.
