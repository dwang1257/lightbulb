import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # Add server/ to path

from app import app

import pytest

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_health_check(client):
    response = client.get('/')
    assert response.status_code == 200
    assert b'Backend is running!' in response.data

def test_test_endpoint(client):
    response = client.get('/test')
    assert response.status_code == 200
    assert b'Backend is working!' in response.data

def test_generate_ideas(client):
    # Test 400 error when missing interests/tech_stack
    response = client.post('/server/generate-ideas', json={
        "interests": ["Machine Learning"],
        "tech_stack": ["Python",]
    })
    assert response.status_code == 200
    assert b'ideas' in response.data