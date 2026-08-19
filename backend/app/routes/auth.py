from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.security import hash_password, verify_password
from app.db.database import get_db
from app.db.models import User
from app.schemas.auth import LoginRequest, RegisterRequest, UserResponse

router = APIRouter()


@router.post("/register", response_model=UserResponse)
def register(
    request: RegisterRequest,
    db: Session = Depends(get_db),
):
    if request.password != request.confirm_password:
        raise HTTPException(
            status_code=400,
            detail="Mật khẩu nhập lại không khớp.",
        )

    existing_username = (
        db.query(User)
        .filter(User.username == request.username)
        .first()
    )

    if existing_username:
        raise HTTPException(
            status_code=400,
            detail="Username đã được sử dụng.",
        )

    user = User(
        username=request.username,
        email=request.email,
        password_hash=hash_password(request.password),
    )

    db.add(user)

    try:
        db.commit()
        db.refresh(user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Username đã được sử dụng.",
        )

    return user


@router.post("/login")
def login(
    request: LoginRequest,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(
            (User.email == request.email)
            | (User.username == request.email)
        )
        .first()
    )

    if not user or not verify_password(
        request.password,
        user.password_hash,
    ):
        raise HTTPException(
            status_code=401,
            detail="Tài khoản hoặc mật khẩu không đúng.",
        )

    return {
        "message": "Đăng nhập thành công.",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
        },
    }
