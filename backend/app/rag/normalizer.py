from typing import Dict

class DocumentNormalizer:
    def normalize_scheme_document(self, raw_content: str) -> Dict:
        return {
            "title": "Normalized Scheme Document",
            "clean_text": raw_content.strip(),
            "status": "ready_for_chunking"
        }
