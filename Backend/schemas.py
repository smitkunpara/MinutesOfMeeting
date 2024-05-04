from pydantic import BaseModel

class User(BaseModel):
    email: str
    password: str

class OTPVerify(BaseModel):
    email: str
    otp: int