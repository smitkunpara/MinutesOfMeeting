import os
import shutil
from typing import Union
import assemblyai as aai
from fastapi import FastAPI, UploadFile
from video_processing import final
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/uploadfile")
async def create_upload_file(file: UploadFile = UploadFile(...)):
    print("\n\n\n\n")
    print(file.filename)
    video_id = (file.filename).replace(" ", "_")
    with open(f"files/videos/{video_id}", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    video_id = video_id.split(".")[0]
    return {"video_id": video_id}

@app.get("/transcript/{video_id}")
def read_item(video_id: str):
# @app.get("/transcript")
# def read_item():
    aai.settings.api_key = "b5a07145193344c1945082ff6bcca3b5"
    config = aai.TranscriptionConfig(
        speaker_labels=True,
    )
    transcriber = aai.Transcriber()
    transcript = transcriber.transcribe(f"files/videos/{video_id}.mp4", config)
    # transcript = transcriber.transcribe(f"check.mp4", config)
    # save the transcript to a file
    if transcript.status == aai.TranscriptStatus.error:
        return {"error": transcript.error}
    else:
        with open(f"files/transcript/{video_id}.txt", "w") as file:
            for utterance in transcript.utterances:
                file.write(f"{utterance.speaker}: {utterance.text}\n")
        return transcript.utterances

@app.get("/summary/{video_id}")
def read_item(video_id: str):
# @app.get("/summary")
# def read_item():
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
    
    text = "Give the summary/minutes of meeting in plan text\n\n"
    # with open(f"transcript.txt", "r") as file:
    #     text = file.read()
    with open(f"files/transcript/{video_id}.txt", "r") as file:
        text = file.read()

    response = model.generate_content(text)
    with open(f"files/summary/{video_id}.txt", "w") as file:
        file.write(response.text)
    # print(response.text)
    return response.text


    
@app.post("/LTS")
async def read_item(file: UploadFile = UploadFile(...)):
    temp_file_path = "temp_video.mp4"  # Temporary file path
    output_folder = "output"  # Output folder path

    try:
        with open(temp_file_path, "wb") as temp_file:
            shutil.copyfileobj(file.file, temp_file)

        # final(temp_file_path)

        output_files = [f for f in os.listdir(output_folder) if os.path.isfile(os.path.join(output_folder, f))]
        return {"output_files": output_files}

    except Exception as e:
        os.remove(temp_file_path)
        os.remove(os.path.join(output_folder, "output_audio.wav"))
        os.remove(os.path.join(output_folder, "transcript.txt"))
        return {"error": f"An error occurred: {e}"}
