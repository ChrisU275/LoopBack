from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector
from .database import get_db

api = Blueprint('api', __name__)

# Registration/Signup endpoint
@api.route('/auth/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    postal_code = data.get('postalCode', '')
    
    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400
    
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    try:
        # Check if user exists
        cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            return jsonify({'error': 'Email already registered'}), 409
        
        # Hash password
        hashed_pw = generate_password_hash(password)
        
        # Insert new user
        cursor.execute(
            """INSERT INTO users (name, email, password, postal_code, points) 
               VALUES (%s, %s, %s, %s, %s)""",
            (name, email, hashed_pw, postal_code, 0)
        )
        db.commit()
        user_id = cursor.lastrowid
        
        # Set session
        session['user_id'] = user_id
        
        return jsonify({
            'id': user_id,
            'name': name,
            'email': email,
            'postalCode': postal_code,
            'points': 0
        }), 201
        
    except mysql.connector.Error as err:
        db.rollback()
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()


# Login/Signin endpoint
@api.route('/auth/signin', methods=['POST'])
def signin():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400
    
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    try:
        cursor.execute(
            "SELECT * FROM users WHERE email = %s",
            (email,)
        )
        user = cursor.fetchone()
        
        if not user or not check_password_hash(user['password'], password):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Set session
        session['user_id'] = user['id']
        
        return jsonify({
            'id': user['id'],
            'name': user['name'],
            'email': user['email'],
            'postalCode': user['postal_code'],
            'points': user['points']
        })
        
    finally:
        cursor.close()


# Get current user (getMe)
@api.route('/auth/me', methods=['GET'])
def get_me():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Not authenticated'}), 401
    
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    try:
        cursor.execute(
            "SELECT id, name, email, postal_code, points FROM users WHERE id = %s",
            (user_id,)
        )
        user = cursor.fetchone()
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'id': user['id'],
            'name': user['name'],
            'email': user['email'],
            'postalCode': user['postal_code'],
            'points': user['points']
        })
        
    finally:
        cursor.close()


# Update user profile (updateMe)
@api.route('/auth/me', methods=['PUT'])
def update_me():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Not authenticated'}), 401
    
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    postal_code = data.get('postalCode')
    
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    try:
        # Check if email is taken by another user
        if email:
            cursor.execute(
                "SELECT id FROM users WHERE email = %s AND id != %s",
                (email, user_id)
            )
            if cursor.fetchone():
                return jsonify({'error': 'Email already in use'}), 409
        
        # Update user
        cursor.execute(
            """UPDATE users 
               SET name = %s, email = %s, postal_code = %s 
               WHERE id = %s""",
            (name, email, postal_code, user_id)
        )
        db.commit()
        
        # Fetch updated user
        cursor.execute(
            "SELECT id, name, email, postal_code, points FROM users WHERE id = %s",
            (user_id,)
        )
        user = cursor.fetchone()
        
        return jsonify({
            'id': user['id'],
            'name': user['name'],
            'email': user['email'],
            'postalCode': user['postal_code'],
            'points': user['points']
        })
        
    except mysql.connector.Error as err:
        db.rollback()
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()


# Logout
@api.route('/auth/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out'}), 200