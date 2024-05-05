import mysql.connector
from mysql.connector import Error
from schemas import User
from config import settings
import json

class Database:
    def __init__(self):
        try:
            self.connection = mysql.connector.connect(
                host=settings.MYSQL_HOST,  
                port=settings.MYSQL_PORT,
                user=settings.MYSQL_USERNAME,
                password=settings.MYSQL_PASSWORD,
                database=settings.MYSQL_DATABASE
            )
            if self.connection.is_connected():
                print('Connected to MySQL database')
        except Error as e:
            print(f"Error while connecting to MySQL: {e}")

    def close_connection(self):
        if self.connection.is_connected():
            self.connection.close()
            print('MySQL connection closed')
    
    def get_user(self, username):
        cursor = self.connection.cursor(dictionary=True)
        query = "SELECT * FROM users WHERE email = %s"
        cursor.execute(query, (username,))
        user = cursor.fetchone()
        cursor.close()
        return user
    
    def update_user_verification_status(self, username, is_verified):
        cursor = self.connection.cursor()
        query = "UPDATE users SET is_verified = %s WHERE email = %s"
        cursor.execute(query, (is_verified, username))
        self.connection.commit()
        cursor.close()
    
    def verify_meeting_id(self,meeting_id,email):
        cursor = self.connection.cursor()
        query = "SELECT * FROM meetings WHERE meeting_id = %s AND email = %s"
        cursor.execute(query, (meeting_id,email))
        result = cursor.fetchone()
        cursor.close()
        return result is not None
    
    def add_meeting_id(self,meeting_id,email):
        cursor = self.connection.cursor()
        query = "INSERT INTO meetings (meeting_id, email,is_shared) VALUES (%s, %s, %s)"
        cursor.execute(query, (meeting_id,email,False))
        self.connection.commit()
        cursor.close()

    def get_meetings(self,email):
        cursor = self.connection.cursor()
        query = "SELECT meeting_id FROM meetings WHERE email = %s"
        cursor.execute(query, (email,))
        result = cursor.fetchall()
        cursor.close()
        return result

    def add_user(self, username, password,is_verified=True):
        cursor = self.connection.cursor()
        query = "INSERT INTO users (email, password_hash,is_verified) VALUES (%s, %s, %s)"
        cursor.execute(query, (username, password,is_verified))
        self.connection.commit()
        cursor.close()

    def add_blacklisted_token(self, token):
        cursor = self.connection.cursor()
        query = "INSERT INTO blacklistedtokens (token) VALUES (%s)"
        cursor.execute(query, (token,))
        self.connection.commit()
        cursor.close()

    def is_token_blacklisted(self, token):
        cursor = self.connection.cursor()
        query = "SELECT * FROM blacklistedtokens WHERE token = %s"
        cursor.execute(query, (token,))
        result = cursor.fetchone()
        cursor.close()
        return result is not None
    
    def insert_transcript(self,meeting_id,transcript):
        cursor = self.connection.cursor()
        cursor.execute("INSERT INTO minutesOfMeetings (meeting_id,transcript) VALUES (%s,%s)", (meeting_id,transcript))
        self.connection.commit()
        cursor.close()

    def get_transcript(self,meeting_id):
        cursor = self.connection.cursor()
        cursor.execute("SELECT transcript FROM minutesOfMeetings WHERE meeting_id = %s", (meeting_id,))
        result = cursor.fetchone()
        cursor.close()
        return result

    def insert_summary(self,meeting_id,summary):   
        cursor = self.connection.cursor() 
        cursor.execute("UPDATE minutesOfMeetings set summary = (%s) WHERE meeting_id = (%s)", (summary,meeting_id))
        self.connection.commit()
        cursor.close()

    def get_summary(self,meeting_id):
        cursor = self.connection.cursor()
        cursor.execute("SELECT summary FROM minutesOfMeetings WHERE meeting_id = %s", (meeting_id,))
        result = cursor.fetchone()
        cursor.close()
        return result
    
    def remove_user(self,username):
        #delete user also from meetings and minutesOfMeetings
        cursor = self.connection.cursor()
        cursor.execute("DELETE FROM users WHERE email = %s", (username,))
        cursor.execute("DELETE FROM meetings WHERE email = %s", (username,))
        cursor.execute("DELETE FROM minutesOfMeetings WHERE email = %s", (username,))
        self.connection.commit()
        cursor.close()
        




# import mysql.connector
# from config import settings
# import json

# cnx = mysql.connector.connect(
#     host=settings.MYSQL_HOST,  
#     port=settings.MYSQL_PORT,
#     user=settings.MYSQL_USERNAME,
#     password=settings.MYSQL_PASSWORD,
#     database=settings.MYSQL_DATABASE
# )

# # Create a cursor object
# cursor = cnx.cursor()







# def insert_transcript(transcript):
#     cursor.execute("INSERT INTO Transcript (transcript) VALUES (%s)", (json.dumps(transcript),))
#     cnx.commit()


# def get_transcript(transcript_id):
#     cursor.execute("SELECT * FROM Transcript WHERE id = %s", (transcript_id,))
#     result = cursor.fetchone()
#     return result

# def insert_summary(summary):    
#     cursor.execute("INSERT INTO Summary (summary) VALUES (%s)", (json.dumps(summary),))
#     cnx.commit()

# def get_summary(summary_id):
#     cursor.execute("SELECT * FROM Summary WHERE id = %s", (summary_id,))
#     result = cursor.fetchone()
#     return result
