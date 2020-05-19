FROM python:3.7

RUN pip install Flask flask gunicorn pandas sklearn firebase-admin seaborn numpy

COPY src/ app/ 

WORKDIR /app                                                          

ENV PORT 8080

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 app:app