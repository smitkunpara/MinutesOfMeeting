import mysql.connector
from mysql.connector import Error
from schemas import User
from config import settings
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
        query = "SELECT * FROM users WHERE username = %s"
        cursor.execute(query, (username,))
        user = cursor.fetchone()
        cursor.close()
        return user

    def add_user(self, username, password,is_verified=False):
        cursor = self.connection.cursor()
        query = "INSERT INTO users (username, password,is_verified) VALUES (%s, %s, %s)"
        cursor.execute(query, (username, password,is_verified))
        self.connection.commit()
        cursor.close()

    def add_blacklisted_token(self, token):
        cursor = self.connection.cursor()
        query = "INSERT INTO blacklisted_token (token) VALUES (%s)"
        cursor.execute(query, (token,))
        self.connection.commit()
        cursor.close()

    def is_token_blacklisted(self, token):
        cursor = self.connection.cursor()
        query = "SELECT * FROM blacklisted_token WHERE token = %s"
        cursor.execute(query, (token,))
        result = cursor.fetchone()
        cursor.close()
        return result is not None
    
    def insert_transcript(self,transcript):
        cursor = self.connection.cursor()
        cursor.execute("INSERT INTO Transcript (transcript) VALUES (%s)", (json.dumps(transcript),))
        self.connection.commit()
        cursor.close()


    def get_transcript(self,transcript_id):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM Transcript WHERE id = %s", (transcript_id,))
        result = cursor.fetchone()
        cursor.close()
        return result

    def insert_summary(self,summary):   
        cursor = self.connection.cursor() 
        cursor.execute("INSERT INTO Summary (summary) VALUES (%s)", (json.dumps(summary),))
        self.connection.commit()
        cursor.close()

    def get_summary(self,summary_id):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM Summary WHERE id = %s", (summary_id,))
        result = cursor.fetchone()
        cursor.close()
        return result





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
