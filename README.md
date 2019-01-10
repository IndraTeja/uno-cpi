# UNO Community Partnership Intiative 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) | [![HitCount](http://hits.dwyl.io/IndraTeja/uno-cpi.svg)](http://hits.dwyl.io/IndraTeja/uno-cpi) 

Official repository of the Community Partnership initiative (UNO) Project for Fall 2018 Capstone Class Written in 

    •	Python 3.7
    •	Django 2.1.1
    •	PostgreSQL 10.5
    •	Google maps API
    •	Herokuapp


# Getting Started:

1. Clone the repo on your local machine. Use the command in your git terminal:
    ```
    $  git clone https://github.com/IndraTeja/uno-cpi.git
    $  cd uno-cpi
    ```

1.	Install Python from https://www.python.org/downloads/

    **Note:** Make sure you have set the right local and environment variables.

1.	Install Django framework using the command:

    ```python
    pip install django==2.1.1
    ```

1.	Next, install the required packages to start the app, using the command:

    ```python
    pip install -r requirements.txt
    ```

    Install shapely package. [Click here to download](https://www.lfd.uci.edu/~gohlke/pythonlibs/#shapely)
    
    Check for your python version and win processor bit 32 bit or 64 bit
    
    ```python
    pip install Shapely‑1.6.4.post1‑cp37‑cp37m‑win_amd64.whl
    ```

# Database Migration:

   Navigate to the repo directory with manage.py and migrate the database using the commands:

    ```
    python manage.py makemigrations
    python manage.py migrate
    ```
   Use the below command to start the server and open http://127.0.0.1:8000/ on your browser.
	
    `python manage.py runserver`


