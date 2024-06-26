# Minutes of Meeting (MoM) System

## Description
The Minutes of Meeting (MoM) System is a web-based application designed to streamline the process of capturing, managing, and disseminating meeting outcomes. Leveraging advanced technologies such as speech-to-text transcription and AI-driven summarization, the system aims to revolutionize how organizations handle meeting documentation.

## Key Features
- Upload meeting recordings for transcription
- Generate accurate transcripts with speaker labels
- Summarize meeting discussions and decisions into concise minutes
- User-friendly interface with intuitive navigation
- Secure user registration and authentication
- Compatibility with various devices and browsers
- Scalable architecture to accommodate growing user base and data volume

## Installation
1. Clone the repository: 
```bash 
git clone https://github.com/smitkunpara/MinutesOfMeeting
```

2. Install python requirements and start Backend server
```bash
cd MinutesOfMeeting/Backend
pip install -r requirements.txt
uvicorn main:app --reload
```
3. In separate terminal start Frontend 
```bash 
cd MinutesOfMeeting/Frontend
npm install
npm run dev
```
4. Access the application in your web browser at 
```bash
http://localhost:5173
```

## Usage
1. Register for a new account or log in with existing credentials.
2. Upload meeting recordings in audio format.
3. Wait for the system to transcribe the audio into text format.
4. Review the generated transcripts and minutes for accuracy.
5. Share meeting records with team members or download for offline use.

## Contributing
1. Fork the repository
2. Create your feature branch: 
```bash 
git checkout -b feature/new-feature
```
3. Commit your changes: 
```bash 
git commit -am 'Add new feature'
```
4. Push to the branch: 
```bash 
git push origin feature/new-feature
```
5. Submit a pull request


## Contact
For inquiries or support, please contact [smitkunpara@gmail.com](mailto:smitkunpara@gmail.com).

