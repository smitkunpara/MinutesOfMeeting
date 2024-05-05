from db import Database
import json
import assemblyai as aai
from config import settings
from fastapi import HTTPException,status
import google.generativeai as genai

database = Database()

def transcribe(video_id):
    result = database.get_transcript(video_id)
    if result:
        return json.loads(result[0])
    aai.settings.api_key = settings.ASSEMBLYAI_API_KEY
    config = aai.TranscriptionConfig(
        speaker_labels=True,
    )
    transcriber = aai.Transcriber()
    try:
        transcript = transcriber.transcribe(f"files/videos/{video_id}.wav", config)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Meeting not found") 
    # transcript = transcriber.transcribe(f"check.mp4", config)
    if transcript.status == aai.TranscriptStatus.error:
        return {"error": transcript.error}
    else:
        dump_transcript=[]
        for utterance in transcript.utterances:
            words = []
            for word in utterance.words:
                words.append({"start": word.start, "end": word.end, "confidence": word.confidence, "text": word.text, "speaker": word.speaker})
            dump_transcript.append({"speaker": utterance.speaker, "text": utterance.text, "start": utterance.start, "end": utterance.end, "confidence": utterance.confidence, "words": words})
        dumpVal = json.dumps(dump_transcript)
        database.insert_transcript(video_id, dumpVal)
        return dump_transcript

def summarize(video_id):
    result = database.get_summary(video_id)
    print(result)
    if result[0]:
        return json.loads(result[0])
    
    GOOGLE_API_KEY=settings.GOOGLE_API_KEY
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
    result = database.get_transcript(video_id)
    if result:
        transcript = json.loads(result[0])
        for utterance in transcript:
            text += utterance["text"] + "\n\n"

    response = model.generate_content(text)
    dump_summary = json.dumps(response.text)
    database.insert_summary(video_id, dump_summary)

    return response.text