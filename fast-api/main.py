from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, User

app = FastAPI()

engine = create_engine("sqlite:///database.db")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

@app.post("/data/")
def create_data(name: str, value: str):
    db = SessionLocal()
    data = User(name=name, value=value)
    db.add(data)
    db.commit()
    db.refresh(data)
    return data

@app.get("/data/")
def read_data():
    db = SessionLocal()
    data = db.query(User).all()
    return data
