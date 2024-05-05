import os
import shutil
from fastapi import FastAPI, UploadFile,Request,Header,Depends,HTTPException,status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import random
import string
from pydub import AudioSegment
from schemas import User
from auth import verify_user,get_current_user_email,remove_access_token,create_user
from schemas import OTPVerify
from utils import summarize,transcribe
from db import Database





database = Database()

   



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
    return verify_user(user)

@app.post("/signup")
async def signup(user : User):
    print(user)
    return create_user(user)
    # return create_user(user)

# @app.post("/verify")
# async def signup(otpVerify: OTPVerify):
#     print(otpVerify)
    # return verify_otp(otpVerify)

@app.get("/logout")
async def logout(message:str = Depends(remove_access_token)):
    # print(token)
    # database.add_blacklisted_token(token)
    return message

@app.get("/get_meetings")
async def get_meetings(email: str = Depends(get_current_user_email)):
    return database.get_meetings(email)
    

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/transcript/{meeting_id}")
def getTranscript(meeting_id: str, email: str = Depends(get_current_user_email)):
    if database.verify_meeting_id(meeting_id,email) == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Meeting not found") 
    return transcribe(meeting_id)


@app.get("/summary/{meeting_id}")
def getSummary(meeting_id:str,email: str = Depends(get_current_user_email)):
    if database.verify_meeting_id(meeting_id,email) == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Meeting not found") 
    return summarize(meeting_id)


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
    


# @app.post("/uploadfile")
# async def create_upload_file(file: UploadFile = UploadFile(...)):
#     print("\n\n\n\n")
#     print(file.filename)
#     video_id = generate_random_id() 
#     with open(f"files/videos/{video_id}", "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)
#     audio = AudioSegment.from_file(f"files/videos/{video_id}")
#     audio.export(f"files/videos/{video_id}.wav", format="wav")
#     os.remove(f"files/videos/{video_id}")
#     return {"video_id": video_id}
#with jwt authentication
@app.post("/uploadfile")
async def create_upload_file(file: UploadFile = UploadFile(...) ,email: str = Depends(get_current_user_email)):
    meeting_id = generate_random_id()
    with open(f"files/videos/{meeting_id}", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    audio = AudioSegment.from_file(f"files/videos/{meeting_id}")
    audio.export(f"files/videos/{meeting_id}.wav", format="wav")
    os.remove(f"files/videos/{meeting_id}")
    database.add_meeting_id(meeting_id=meeting_id,email=email)
    return {"video_id": meeting_id}



 