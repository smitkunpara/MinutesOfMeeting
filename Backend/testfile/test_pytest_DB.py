#install "pip install pytest pytest-sugar pytest-html"
#Only for testing purpose
import pytest
from db import DataBase

db = DataBase()

def setup_function(function):
    # Clear your test database before each test
    db.client.drop_database('test_database')

def test_get_user():
    # Add a test user
    db.add_user('test_user', 'test_password')
    # Check that the user can be retrieved
    user = db.get_user('test_user')
    assert user is not None
    assert user['email'] == 'test_user'

def test_update_user_verification_status():
    # Add a test user
    db.add_user('test_user', 'test_password')
    # Update the user's verification status
    db.update_user_verification_status('test_user', True)
    # Check that the user's verification status was updated
    user = db.get_user('test_user')
    assert user is not None
    assert user['is_verified'] == True

def test_blacklisted_token():
    # Add a token to the blacklist
    db.add_blacklisted_token('test_token6')
    # Check that the token is blacklisted
    assert db.is_token_blacklisted('test_token') == True

def test_transcript():
    # Insert a transcript
    db.insert_transcript('test_meeting_id', 'test_transcript')
    # Check that the transcript can be retrieved
    transcript = db.get_transcript('test_meeting_id')
    assert transcript is not None
    assert transcript['transcript'] == 'test_transcript'

def test_summary():
    # Insert a summary
    db.insert_summary('test_meeting_id', 'test_summary')
    # Check that the summary can be retrieved
    summary = db.get_summary('test_meeting_id')
    assert summary is not None
    assert summary['summary'] == 'test_summary'

# Add more tests for the other methods in the same way
#pip unistall pytest pytest-sugar pytest-html 



