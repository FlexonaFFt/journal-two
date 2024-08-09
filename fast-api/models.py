from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Создаем базовый класс
Base = declarative_base()

# Определяем модель
class User(Base):
    __tablename__ = 'users'  # Название таблицы в базе данных

    id = Column(Integer, primary_key=True, index=True)  # Первичный ключ
    name = Column(String, index=True)  # Имя пользователя
    email = Column(String, unique=True, index=True)  # Email пользователя

# Создаем подключение к базе данных
engine = create_engine("sqlite:///database.db")
Base.metadata.create_all(bind=engine)  # Создаем таблицы в базе данных
