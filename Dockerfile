# Hugging Face Spaces Dockerfile for ECHO Backend
# HF Spaces routes external traffic to port 7860 by default

FROM python:3.12-slim

WORKDIR /app

# System dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies (CPU-only torch — much smaller image)
COPY requirements_deploy.txt .
RUN pip install --no-cache-dir -r requirements_deploy.txt

# Copy application code and data
COPY backend/ ./backend/
COPY ml/ ./ml/
COPY Beauty/ ./Beauty/

# HF Spaces listens on 7860
EXPOSE 7860

# Start FastAPI on port 7860
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "7860"]
