#!/bin/bash

export NODE_ENV=qa

mkdir ./build-qa
mkdir build-qa/logs
mkdir build-qa/user_form_data

echo "keep me" > build-qa/logs/.gitkeep
echo "keep me" > build-qa/user_form_data/.gitkeep

RUN_CMD="nodemon --watch build-qa --exec 'nodemon build-qa/server.js'"
CP_PACKAGE="cp ./package.json build-qa/"
CP_TEMPLATES="cp -a ./src/helpers/server/docx/templates build-qa/"

echo "/*** IGNORE THE FIRST ERROR ***/"
echo "/*** WEBPACK IS BUILDING build-qa/server.js RIGHT NOW ***/"
echo "/*** NODEMON WILL RESTART THE SERVER WHEN IT'S DONE ***/"
echo " "
echo "Starting QA Build..."
echo " "

WEBPACK_SERVER_CMD="webpack --config webpack.server.js --watch"
WEBPACK_CLIENT_CMD="webpack --config webpack.client.js --watch"

parallelshell "$RUN_CMD" "$WEBPACK_SERVER_CMD" "$WEBPACK_CLIENT_CMD" "$CP_PACKAGE" "$CP_TEMPLATES"

exit 0
