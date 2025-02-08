FROM python:3.10-alpine
WORKDIR /python
ENV FLASK_APP = app.py
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt 
EXPOSE 5000
COPY . /python/
CMD ["python3", "app.py", "--host=0.0.0.0"]



