# ECHO: Explainable Cognitive Denoising for Personalized Recommendations

**Live Demo:** [https://echo-iadsr.vercel.app](https://echo-iadsr.vercel.app) *(Log in with `alice@echo.com`, password: `alice`)*

## Objective & Description
ECHO is an end-to-end, full-stack Deep Learning platform that tackles a fundamental flaw in modern recommender systems: **behavioral noise**. 

Standard recommendation algorithms (like GRU4Rec) assume every user click implies genuine, long-term interest. In reality, users click on items due to fleeting curiosity, accidental misclicks, or buying gifts. When algorithms treat this noise as genuine signal, it distorts the user's algorithmic profile and creates "filter bubbles."

ECHO solves this by implementing a novel variant of Intent-Aware Denoising Sequential Recommendation (IADSR). Before generating recommendations, ECHO evaluates a user's chronological history and utilizes a **Cross-Modal Attention Network** (comparing behavioral sequences against `BGE-Large` semantic text embeddings) to autonomously identify and drop noisy interactions. 

Crucially, ECHO is deployed as an **Explainable AI (XAI)** web application. Instead of operating as a black box, it restores algorithmic accountability by explicitly showing users which items were filtered out of their profile and why.

---

## Instructions to Install and Run

We provide three ways to run the ECHO platform.

### Option 1: Live Cloud Deployment (Recommended)
You do not need to install anything. The entire platform is deployed live on the internet:
*   **Frontend (Next.js):** Hosted on Vercel at [https://echo-iadsr.vercel.app](https://echo-iadsr.vercel.app)
*   **Backend (FastAPI + PyTorch):** Hosted on a free-tier Hugging Face CPU Docker Space.

### Option 2: Docker Compose (Local)
If you have Docker Desktop installed, you can spin up the entire full-stack platform with a single command.
```bash
git clone https://github.com/MODAK-AKSHADA-RAJESH/ECHO-IADSR.git
cd ECHO-IADSR

# Build and start the containers
docker-compose up --build
```
*   Frontend will be available at `http://localhost:3000`
*   Backend API documentation will be at `http://localhost:8000/docs`

### Option 3: Manual Local Development
**1. Start the Python Backend:**
```bash
# It is recommended to use a virtual environment
pip install -r requirements_app.txt

# Run the FastAPI server
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

**2. Start the Next.js Frontend:**
Open a new terminal window.
```bash
cd frontend
npm install

# Point the frontend to your local backend
set NEXT_PUBLIC_API_URL=http://localhost:8000  # (Use $env:NEXT_PUBLIC_API_URL="..." in PowerShell)

npm run dev
```
Open `http://localhost:3000` in your browser.

---

## How to Use the Application

ECHO features Role-Based Access Control (RBAC) with three distinct user experiences tailored to different stakeholders. 

Use the mock credentials below on the `/login` page to explore each perspective:

### 1. The Shopper (`alice@echo.com` / `alice`)
This is the consumer-facing interface demonstrating Explainable AI.
*   **Recommendations:** View clean, denoised product recommendations. Click on any item to view it on Amazon.
*   **My History:** This is the core of the explainability. View a chronological list of historical interactions. ECHO explicitly highlights which items were used to build the algorithmic profile, and which were discarded as "Noise" (with text explanations).
*   **Profile:** View the user's "Signal Quality" score and their "Community Similarity" metric, which calculates L2-norm distances against the broader user base.

### 2. The Platform Manager (`admin@echo.com` / `admin`)
This interface is for business analysts ensuring platform health.
*   **Platform Overview:** View real-time aggregate statistics on total users, average noise rates across the platform, and user retention estimates.
*   **User Directory:** Inspect specific users to see their individual noise profiles.
*   **Impact Analysis:** Visualizes the theoretical business impact of removing filter bubbles from the ecosystem.

### 3. The ML Researcher (`researcher@echo.com` / `researcher`)
This interface is for the data science team.
*   **Model Methodology:** Explores the architectural block diagram, hyperparameter configurations, and the specific cross-modal mathematics driving the engine.
*   **Ablation Study:** A detailed breakdown proving *why* the ECHO architecture was chosen by demonstrating the performance drop-off when specific modalities (Semantic, Behavioral, Cross-Modal) are removed.

---

## Additional Relevant Information

### Key Technical Contributions
1.  **Lightweight Semantic Encoder:** Replaced massive 8B-parameter generative LLMs (like LLaMA-3) used in standard IADSR with `BAAI/bge-large-en-v1.5` (335M parameters). This 24× reduction in parameter count makes real-time CPU deployment feasible.
2.  **Attention-Weighted Gumbel Masking:** Replaced simple heuristic summation with a learnable attention layer coupled with a Gumbel-Sigmoid activation, allowing the network to make hard, differentiable "keep/drop" decisions.

### Performance & Architectural Trade-off
Evaluated on the public **Amazon Beauty Product Reviews** dataset (22,363 users, 12,102 items). 

| Model Configuration | HR@20 | NDCG@20 | Parameters | Deployability |
| :--- | :--- | :--- | :--- | :--- |
| **GRU4Rec (Baseline)** | 0.0390 | 0.0143 | ~1.5M | High (CPU feasible) |
| **Original IADSR (Llama-3-8B)** | *0.0486* | *0.0241* | ~8.0B | **None** (Requires 16GB+ VRAM) |
| **ECHO (Our BGE-Large Variant)** | **0.0427** | **0.0206** | **~335M** | **High** (Runs on free-tier CPU) |

**The Trade-off:** While the original theoretical IADSR architecture achieves the highest raw metrics by utilizing massive generative Large Language Models (LLMs) to compute semantic distances, it is computationally prohibitive for real-world e-commerce deployment. 

By replacing the 8B-parameter LLM with our attention-weighted `BGE-Large` dense retrieval architecture, ECHO achieves a **24× reduction in parameter count**. While this results in a marginal drop from the theoretical maximum accuracy, it still achieves a massive **+44% NDCG@20 improvement** over the un-denoised GRU4Rec baseline. This deliberate architectural trade-off sacrifices a small fraction of academic accuracy to achieve sub-second, real-time inference viability, allowing us to successfully deploy the first full-stack, publicly accessible variant of IADSR.

*Built for IT549: Deep Learning (2026).*
