Sweet Shop Management


A full stack project which helps to manage the sweet shop.

Users can register, login, view and purchase sweets. While admin can add, see, update, delete and restock the sweets.

Technologies used are:
* Backend: Django + Django Rest Framework
* Frontend: React
* Authentication: JWT
* Database: SQLite

Features:

1. Users
* Register and Login
* View all sweets
* Make purchase if available
* Search by name, category or price
2. Admin
* Add new sweets
* Delete or update sweets
* Restock sweets
* Admin role is checked from backend.

How to run:

* Backend
o Bash
o cd backend
o python -m venv venv
o source venv/bin/activate   # for Windows: venv\Scripts\activate
o pip install -r requirements.txt
o python manage.py migrate
o python manage.py runserver

* Frontend
o cd frontend
o npm install
o npm start

API EndPoint:

EndPointMethodDescription/api/auth/register/POSTUser Registration/api/auth/login/POSTUser login/api/auth/user/GETGet user info/api/sweets/GET/POSTView/Add Sweets/api/sweets/search/GETSearch Sweets/api/sweets/:id/PUT/DELETEUpdate/Delete/api/sweets/:id/purchase/POSTPurchase sweet/api/sweets/:id/restock/POSTRestock sweet
AI Usage

I used ChatGPT and GitHub Copilot to help build this project.

Tools Used:
* ChatGPT: For designing backend structure, frontend forms, and fixing errors.
* GitHub Copilot: For writing boilerplate React Code and Django views.

Reflection
* AI helped me understand how to structure full-stack apps.
* I used it mainly for learning and speeding up common tasks.
* All code was reviewed and modified by me as needed.
