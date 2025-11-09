from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector
from db import get_db

api = Blueprint('api', __name__)

# -------------------------------
# Auth Endpoints
# -------------------------------

# Registration/Signup
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
        cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            return jsonify({'error': 'Email already registered'}), 409

        hashed_pw = generate_password_hash(password)
        cursor.execute(
            """INSERT INTO users (name, email, password, postal_code, points) 
               VALUES (%s, %s, %s, %s, %s)""",
            (name, email, hashed_pw, postal_code, 0)
        )
        db.commit()
        user_id = cursor.lastrowid
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

# Login/Signin
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
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        if not user or not check_password_hash(user['password'], password):
            return jsonify({'error': 'Invalid credentials'}), 401

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
        if email:
            cursor.execute(
                "SELECT id FROM users WHERE email = %s AND id != %s",
                (email, user_id)
            )
            if cursor.fetchone():
                return jsonify({'error': 'Email already in use'}), 409

        cursor.execute(
            """UPDATE users 
               SET name = %s, email = %s, postal_code = %s 
               WHERE id = %s""",
            (name, email, postal_code, user_id)
        )
        db.commit()

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

# -------------------------------
# Listings Endpoints (temporary in-memory storage)
# -------------------------------

listings = []

# Get all listings
@api.route('/listings', methods=['GET'])
def get_listings():
    return jsonify(listings)

# Add a new listing
@api.route('/listings', methods=['POST'])
def add_listing():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    data['id'] = len(listings) + 1
    listings.append(data)
    return jsonify(data), 201

# Get a single listing by ID
@api.route('/listings/<int:listing_id>', methods=['GET'])
def get_listing(listing_id):
    listing = next((l for l in listings if l['id'] == listing_id), None)
    if not listing:
        return jsonify({'error': 'Listing not found'}), 404
    return jsonify(listing)
