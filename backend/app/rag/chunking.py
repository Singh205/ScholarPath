from typing import List

class DocumentChunker:
    def chunk_text(self, text: str, chunk_size: int = 500) -> List[str]:
        if not text:
            return []
        return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
