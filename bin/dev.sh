#!/bin/bash

export NODE_ENV=development

mkdir ./dev_build
mkdir dev_build/logs

echo "/*** IGNORE THE FIRST ERROR ***/"
echo "/*** WEBPACK IS BUILDING dev_build/server.js RIGHT NOW ***/"
echo "/*** NODEMON WILL RESTART THE SERVER WHEN IT'S DONE ***/"
echo " "
echo "Starting the build..."
echo " "

RUN_CMD="nodemon --watch dev_build --exec 'nodemon dev_build/server.js'"
WEBPACK_SERVER_CMD="webpack --config webpack.server.js --watch"
WEBPACK_CLIENT_CMD="webpack --config webpack.client.js --watch"

parallelshell "$RUN_CMD" "$WEBPACK_SERVER_CMD" "$WEBPACK_CLIENT_CMD"

exit 0
