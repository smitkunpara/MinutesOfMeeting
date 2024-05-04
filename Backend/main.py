import os
import shutil
from typing import Union
import assemblyai as aai
from fastapi import FastAPI, UploadFile,Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import random
import string
import mysql.connector
import json
from pydub import AudioSegment
from config import settings

   



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

cnx = mysql.connector.connect(
    host=settings.MYSQL_HOST,  
    port=settings.MYSQL_PORT,
    user=settings.MYSQL_USERNAME,
    password=settings.MYSQL_PASSWORD,
    database=settings.MYSQL_DATABASE
)

# Create a cursor object
cursor = cnx.cursor()


def generate_random_id():
    characters = string.ascii_letters + string.digits
    random_id = ''.join(random.choice(characters) for _ in range(8))
    return random_id

    

@app.get("/")
def read_root():
    return {"Hello": "World"}

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

@app.get("/transcript/{video_id}")
def read_item(video_id: str):
# @app.get("/transcript")
# def read_item():
    cursor.execute("SELECT * FROM Transcript WHERE id = %s", (video_id,))
    result = cursor.fetchone()
    if result:
        return json.loads(result[1])
    
    
    aai.settings.api_key = "b5a07145193344c1945082ff6bcca3b5"
    config = aai.TranscriptionConfig(
        speaker_labels=True,
    )
    transcriber = aai.Transcriber()
    transcript = transcriber.transcribe(f"files/videos/{video_id}.wav", config)
    # transcript = transcriber.transcribe(f"check.mp4", config)
    # save the transcript to a file
    if transcript.status == aai.TranscriptStatus.error:
        return {"error": transcript.error}
    else:
        # with open(f"files/transcript/{video_id}.txt", "w") as file:
        #     for utterance in transcript.utterances:
        #         file.write(f"{utterance.speaker}: {utterance.text}\n")

        # convert trancript.utterence to json dump
        dump_transcript=[]
        for utterance in transcript.utterances:
            words = []
            for word in utterance.words:
                words.append({"start": word.start, "end": word.end, "confidence": word.confidence, "text": word.text, "speaker": word.speaker})
            dump_transcript.append({"speaker": utterance.speaker, "text": utterance.text, "start": utterance.start, "end": utterance.end, "confidence": utterance.confidence, "words": words})
        dumpVal = json.dumps(dump_transcript)
        cursor.execute("INSERT INTO Transcript (id, transcript) VALUES (%s, %s)", (video_id, dumpVal))
        cnx.commit()
        return dump_transcript

@app.get("/summary/{video_id}")
def read_item(video_id: str):
# @app.get("/summary")
# def read_item():
    cursor.execute("SELECT * FROM Summary WHERE id = %s", (video_id,))
    result = cursor.fetchone()
    if result:
        return json.loads(result[1])
    

    import google.generativeai as genai
    import requests

    GOOGLE_API_KEY="AIzaSyCrnsgKHQg4WiKgHcBpJRfVA0YVz7AROQc"
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-1.0-pro-latest')

    generation_config = {
    "temperature": 0,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048,
    }

    safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_ONLY_HIGH"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_ONLY_HIGH"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_ONLY_HIGH"
    },
    ]

    model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                                generation_config=generation_config,
                                safety_settings=safety_settings)
    
    text = "Give the summary/minutes of meeting\n\n"
    # with open(f"files/transcript/{video_id}.txt", "r") as file:
    #     text = file.read()
    cursor.execute("SELECT * FROM Transcript WHERE id = %s", (video_id,))
    result = cursor.fetchone()
    if result:
        transcript = json.loads(result[1])
        for utterance in transcript:
            text += utterance["text"] + "\n\n"

    


    response = model.generate_content(text)
    # with open(f"files/summary/{video_id}.txt", "w") as file:
    #     file.write(response.text)
    dump_summary = json.dumps(response.text)
    cursor.execute("INSERT INTO Summary (id, summary) VALUES (%s, %s)", (video_id, dump_summary))
    cnx.commit()

    return response.text


 