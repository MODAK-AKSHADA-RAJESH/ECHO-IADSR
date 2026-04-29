# ECHO: Explainable Cognitive Denoising for Personalized Recommendations
**Abstract**
Sequential recommendation systems frequently suffer from performance degradation due to noise in user behavioral data, such as impulse clicks or gift purchases. While recent approaches like IADSR leverage large language models (LLMs) to provide cross-modal semantic alignment for denoising, they introduce prohibitive computational overhead for real-time web deployment. We present ECHO, a full-stack, deployed variant of IADSR that introduces two novel contributions: (1) replacing 8B-parameter LLMs with a lightweight 335M-parameter embedding model (BGE-Large), enabling real-time inference on consumer hardware; and (2) an attention-weighted noise scoring mechanism that outperforms uniform heuristic summation. Furthermore, ECHO addresses the social harm of "filter bubbles" by providing a transparent, three-role web interface that restores algorithmic accountability and user agency. Empirical results on the Amazon Beauty dataset demonstrate a 44% improvement in NDCG@20 over the un-denoised GRU4Rec baseline.

## 1. Introduction and Motivation
Recommendation algorithms heavily influence modern information consumption, yet they remain vulnerable to behavioral noise. When algorithms mistake a "one-off" interaction for a genuine shift in preference, they trap users in irrelevant recommendation loops, contributing to filter bubbles and algorithmic manipulation. Current denoising methods are either purely behavioral (struggling to distinguish genuine exploration from noise) or rely on massive LLMs (Llama-3-8B) that cannot be deployed efficiently in production environments. ECHO bridges this gap by introducing a lightweight, attention-driven denoising mechanism deployed within an Explainable AI (XAI) interface.

## 2. Methodology
ECHO operates on a dual-modality architecture:
1. **Semantic Representation:** We extract dense semantic embeddings from product titles using BAAI/bge-large-en-v1.5 (1024-dim), avoiding the 16GB VRAM requirement of generative LLMs.
2. **Behavioral Backbone:** A 2-layer GRU4Rec model encodes the temporal dynamics of user interactions.
3. **Attention-Weighted Denoising:** For each interaction, we calculate three cosine similarities: semantic consistency ($c_1$), behavioral consistency ($c_2$), and cross-modal agreement ($c_3$). Instead of the standard heuristic $score = c_1+c_2+c_3$, ECHO introduces a learnable parameter set: $score = w_1c_1 + w_2c_2 + w_3c_3$. This allows the model to dynamically weight the importance of each modality.
4. **Gumbel-Sigmoid Masking:** The continuous scores are converted into differentiable binary masks to filter noisy items before final recommendation.

## 3. Results and Evaluation
We evaluated ECHO on the public Amazon Beauty dataset (22,363 users, 12,102 items, 159,956 interactions) against a standard GRU4Rec baseline.

| Configuration | HR@10 | HR@20 | NDCG@10 | NDCG@20 |
|---|---|---|---|---|
| GRU4Rec (Baseline) | 0.0246 | 0.0390 | 0.0117 | 0.0143 |
| ECHO (BGE-Large + Attention) | **0.0330** | **0.0427** | **0.0181** | **0.0206** |

ECHO achieves significant performance gains (a 9.5% relative increase in HR@20 and 44% in NDCG@20) over the un-denoised baseline. While it performs slightly below the original Llama-3-based IADSR (HR@20: 0.0486), it does so using 24× fewer parameters, successfully trading marginal accuracy for sub-second production deployment viability.

## 4. Social Impact and System Design
Beyond offline metrics, ECHO was designed to solve the human problem of algorithmic transparency. We developed an end-to-end Next.js application tailored for three distinct roles:
- **Consumers:** Can view their personalized "Signal Clarity" and see exactly which interactions were filtered out, restoring their agency over their algorithmic profile.
- **Platform Managers:** Can monitor aggregate noise distributions to ensure platform health.
- **Researchers:** Can interactively explore ablation studies and performance metrics.

By making the denoising process transparent, ECHO actively mitigates the social harms of opaque recommendation systems, providing a blueprint for accountable AI in e-commerce.
