from fastapi import HTTPException, Depends,status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from db import Database
from schemas import User
from config import settings

SECRET_KEY = settings.JWT_SECRET
ALGORITHM = settings.JWT_ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.JWT_EXPIRES_MINUTES

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
database = Database()

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def verify_user(user:User):
    userdata = database.get_user(user.email)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    # if userdata['is_verified'] == False:
    #     raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not verified")
    if not verify_password(user.email, userdata['password_hash']):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect password")
    return create_access_token(data={"sub": userdata['email']})

def create_user(user:User):
    hashed_password = get_password_hash(user.password)
    database.add_user(user.email, hashed_password,True)
    # return create_otp(User)
    return create_access_token(data={"sub": user.email})

def verify_access_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if database.is_token_blacklisted(token):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token blacklisted")
        if payload is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        return payload
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

def get_current_user_email(token: str = Depends(oauth2_scheme)):
    token_data = verify_access_token(token)
    # user = database.get_user(token_data['sub'])
    # if not user:
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    # return user['email']
    return token_data['sub']

def remove_access_token(token: str = Depends(oauth2_scheme)):
    database.add_blacklisted_token(token)
    return {"message": "User logged out successfully"}
# def verify_otp(otpuser):
#     user = database.get_user(otpuser.username)
#     if not user:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
#     if not verify_password(otpuser.otp, user['otp']):
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect OTP")
#     return create_access_token(data={"sub": user['username']})

# def create_otp(User):
#     import random
#     otp = random.randint(1000,9999)
#     database.add_user(User.username, get_password_hash(User.password),otp)
    
# print(get_password_hash("abc"))