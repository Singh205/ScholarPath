# ScholarPath — AI Scholarship Discovery & Safety Platform MVP

ScholarPath is a modern, AI-powered scholarship discovery, eligibility matching, application assistance, and content safety platform for university students.

## Key Capabilities

- **Interactive Landing & Demo Flow**: High-conversion landing page with instant access to pre-populated student profile.
- **Onboarding Wizard**: 4-step wizard collecting academic, financial, interest, and preference data with LocalStorage state persistence.
- **Central Command Dashboard**: Summary metrics, Recharts category match distribution, upcoming deadlines timeline, and live agent activity stream.
- **Searchable Discovery Directory**: Multi-facet filtering (category, funding range, deadline, risk level, eligibility status).
- **Deep Scholarship Analysis**: Structured eligibility requirement checklist (GPA comparison), document checklist, and AI rationale.
- **Animated Multi-Agent Matching Engine**: 4-stage processing visualizer (Profile -> Matching -> RAG Retrieval -> Safety Audit -> Ranking).
- **Application Workspace & AI Assistant**: Split-screen markdown editor with AI contextual assistant and human-in-the-loop warnings.
- **Scholarship Safety Center**: Deep risk score breakdown (0-100), threat classification, flagged scam patterns, and recommended actions.
- **Viva-Ready Architecture Explorer**: Interactive diagram detailing Microsoft Agent Framework, Azure AI Foundry, Azure AI Search, Azure AI Content Safety, LangChain, and LangGraph integration scaffolding.

## Technology Stack

### Frontend
- React 18 + TypeScript + Vite
- Tailwind CSS
- Lucide React Icons
- Recharts
- React Router DOM v6
- LocalStorage State Persistence

### Backend & AI Architecture Scaffolding
- Python 3.11+
- FastAPI REST Server
- Microsoft Agent Framework Integration Module
- Azure AI Foundry Service Scaffolding
- Azure AI Search (Vector RAG Pipeline)
- Azure AI Content Safety Risk Classifier
- LangChain & LangGraph Pipeline Prototypes

## Getting Started

### 1. Run the Frontend (Demo Mode)

```bash
cd scholarpath/frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Run the Backend API Gateway (Optional)

```bash
cd scholarpath/backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Backend API documentation will be available at [http://localhost:8000/docs](http://localhost:8000/docs).

## Currently Working MVP vs. Future Integration

- **Working MVP**: The frontend compiles and runs completely out-of-the-box using client-side service abstractions and LocalStorage persistence.
- **Integration Ready**: The backend Python project structure contains real architectural files, REST routes, schemas, agent modules, and Azure SDK initialization pathways ready for live cloud credentials.

