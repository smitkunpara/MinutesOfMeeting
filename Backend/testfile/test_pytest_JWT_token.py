import pytest
import time
from jose import jwt
from fastapi.testclient import TestClient
from main import app
from auth import create_access_token

client = TestClient(app)

SECRET_KEY = "672177288fd8569c0331ead2739f8d9cc51209eaa791107fb783de0622cb1d69a5f5d58b1734a3736c32ed49d6c3f59a91841534ff06fbd3c79655f9a3bead992384dbe54532d7347d716f67ecc7a2004e68aad9493d365b1565a412c849569443a6135e0c4d0902d8eae058ea6db2f36686d30f407ad68396629853adeaa580a8a4e93d79d2345d08881038ef82b91fa915862e34bbf7912ca88b515239e2b2b75999178b2c208d9d66b6dba664f35c105814c0e8a759b022e4d422800c011b0d2437e3b717e7ce793f4949085b5d0c21d1d26c7054724fd761c9ddd0aac2523aa1cd6043c1cc6a49319f6a268d6325166e1d7aa04dcfc3f91da6d71f6f71e3"  # Replace with your secret key
ALGORITHM = "HS256"  # Replace with your algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = 100

def test_create_access_token():
    data = {"sub": "test@example.com"}
    token = create_access_token(data)
    decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    assert decoded_token["sub"] == data["sub"]

def test_invalid_token():
    token = "invalid_token"
    with pytest.raises(jwt.JWTError):
        jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

def test_expired_token():
    data = {"sub": "test@example.com", "exp": time.time() - 1000}
    token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
    with pytest.raises(jwt.ExpiredSignatureError):
        jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

def test_invalid_header():
    headers = {"Authorization": "Bearer invalid_token"}
    response = client.get("/get_meetings", headers=headers)
    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid token"}

def test_missing_header():
    response = client.get("/get_meetings")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}