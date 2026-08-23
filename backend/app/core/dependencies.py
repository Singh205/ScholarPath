from app.config import settings

def get_settings():
    return settings

def is_mock_active() -> bool:
    return settings.app_mode.lower() == "mock"
