from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MYSQL_USERNAME: str
    MYSQL_PASSWORD: str
    MYSQL_HOST: str
    MYSQL_PORT: int
    MYSQL_DATABASE: str
    JWT_SECRET: str
    ASSEMBLYAI_API_KEY: str
    GOOGLE_API_KEY: str

    class Config:
        env_file = ".env"

settings = Settings()