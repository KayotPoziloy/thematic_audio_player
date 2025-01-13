#!/bin/bash
# apt install nodejs
# apt install npm

PORT=4000
PID=$(lsof -t -i:$PORT)
if [ -n "$PID" ]; then
    echo "Process using port $PORT found: PID $PID"
    echo "Killing process $PID..."
    kill -9 $PID
    echo "Process $PID has been killed."
else
    echo "No process is using port $PORT."
fi

PORT=2000
PID=$(lsof -t -i:$PORT)
if [ -n "$PID" ]; then
    echo "Process using port $PORT found: PID $PID"
    echo "Killing process $PID..."
    kill -9 $PID
    echo "Process $PID has been killed."
else
    echo "No process is using port $PORT."
fi


npm install
node server.js
