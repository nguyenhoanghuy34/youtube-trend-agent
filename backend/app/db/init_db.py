from app.db.database import Base, engine

# Import models so SQLAlchemy knows them
from app.db.models import Conversation, Message, User


def init_db():
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    init_db()
    print("Database tables created.")