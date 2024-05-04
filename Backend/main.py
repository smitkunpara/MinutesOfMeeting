import os
import shutil
from fastapi import FastAPI, UploadFile,Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import random
import string
from pydub import AudioSegment
from schemas import User
from schemas import OTPVerify

   



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)





def generate_random_id():
    characters = string.ascii_letters + string.digits
    random_id = ''.join(random.choice(characters) for _ in range(8))
    return random_id

@app.post("/signin")
async def login(user : User):
    print(user)
    # return verified_user(user)

@app.post("/signup")
async def signup(user : User):
    print(user)
    # return create_user(user)

@app.post("/verify")
async def signup(otpVerify: OTPVerify):
    print(otpVerify)
    # return verify_otp(otpVerify)

@app.post("/logout")
async def logout(token: str):
    # database.add_blacklisted_token(token)
    return {"message": "User logged out successfully"}

    

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/login")
async def login(email: str, password: str):
    # Your login logic here
    return {"message": "Login successful"}

    

@app.get("/transcript/{video_id}")
def getTranscript(video_id: str):
    from utils import transcribe
    transcript = transcribe(video_id)
    return transcript

@app.get("/summary/{video_id}")
def getSummary(video_id: str):
    from utils import summarize
    summary= summarize(video_id)
    return summary


@app.get("/audio/{video_id}")
async def read_item(request: Request, video_id: str):
    file_path = f"files/videos/{video_id}.wav"
    file_size = os.path.getsize(file_path)
    start, end = 0, file_size - 1
    if "range" in request.headers:
        byte_pos = request.headers["range"].replace("bytes=", "").split("-")
        start = int(byte_pos[0])
        end = int(byte_pos[1]) if len(byte_pos) > 1 and byte_pos[1] else file_size - 1
    def content():
        with open(file_path, 'rb') as f:
            f.seek(start)
            yield f.read(end - start + 1)
    response = StreamingResponse(content(), media_type="audio/wav")
    response.headers["Content-Range"] = f"bytes {start}-{end}/{file_size}"
    response.status_code = 206
    return response
    


@app.post("/uploadfile")
async def create_upload_file(file: UploadFile = UploadFile(...)):
    print("\n\n\n\n")
    print(file.filename)
    video_id = generate_random_id() 
    with open(f"files/videos/{video_id}", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    audio = AudioSegment.from_file(f"files/videos/{video_id}")
    audio.export(f"files/videos/{video_id}.wav", format="wav")
    os.remove(f"files/videos/{video_id}")
    return {"video_id": video_id}



 