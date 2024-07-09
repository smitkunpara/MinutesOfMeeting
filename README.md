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

## Configuration
Before running the application, you need to set up the environment variables. Follow these steps to generate a [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fd%3A%2FMinutesOfMeeting%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "d:\MinutesOfMeeting\.env") file:

1. Navigate to the root directory of the project:
```bash
cd MinutesOfMeeting
```

2. Create a `.env` file:
```bash
touch .env
```

3. Open the [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fd%3A%2FMinutesOfMeeting%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "d:\MinutesOfMeeting\.env") file with your favorite text editor and add the following lines, replacing the placeholder values with your actual API keys, secrets, and other configurations:
```properties
ASSEMBLYAI_API_KEY="<your_assemblyai_api_key>"
GOOGLE_API_KEY="<your_google_api_key>"
JWT_SECRET="<your_jwt_secret>"
JWT_ALGORITHM="HS256"
JWT_EXPIRES_MINUTES=100
EMAIL="<your_email>"
EMAIL_PASSWORD="<your_email_app_password>"
DATABASE_URL="<your_mongodb_connection_string>"
MONGODB_NAME="<you_mongodb_name>"
```
Make sure to replace `<your_assemblyai_api_key>`, `<your_google_api_key>`, `<your_jwt_secret>`, `<your_email>`, `<your_email_app_password>`, and `<your_mongodb_connection_string>` with your actual data.

4. Save the `.env` file and proceed with the installation instructions.

This `.env` file will be automatically used by the application to configure the necessary environment variables.

## Installation
1. Clone the repository: 
```bash 
git clone https://github.com/smitkunpara/MinutesOfMeeting
```

2. Create a virtual environment and activate it
```bash
cd MinutesOfMeeting/Backend
python -m venv venv
# On Windows
venv\Scripts\activate
# On Unix or MacOS
source venv/bin/activate
```

3. Install python requirements and start Backend server
```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

4. In separate terminal start Frontend 
```bash 
cd MinutesOfMeeting/Frontend
npm install
npm run dev
```
5. Access the application in your web browser at 
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

