from typing import Dict, List

class ScholarshipIngestionPipeline:
    def process_document(self, raw_text: str) -> Dict:
        return {
            "chunk_count": 1,
            "text": raw_text[:500],
            "status": "indexed"
        }
