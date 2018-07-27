#!/bin/bash

export NODE_ENV=production

mkdir ./build-prod
mkdir build-prod/logs
mkdir build-prod/user_form_data

echo "keep me" > build-prod/logs/.gitkeep
echo "keep me" > build-prod/user_form_data/.gitkeep

RUN_CMD="nodemon --watch build-prod --exec 'nodemon build-prod/server.js'"
CP_PACKAGE="cp ./package.json build-prod/"
CP_TEMPLATES="cp -a ./src/helpers/server/docx/templates build-prod/"

echo "/*** IGNORE THE FIRST ERROR ***/"
echo "/*** WEBPACK IS BUILDING build-prod/server.js RIGHT NOW ***/"
echo "/*** NODEMON WILL RESTART THE SERVER WHEN IT'S DONE ***/"
echo " "
echo "Starting Production Build..."
echo " "

WEBPACK_SERVER_CMD="webpack --config webpack.server.js --watch"
WEBPACK_CLIENT_CMD="webpack --config webpack.client.js --watch"

parallelshell "$RUN_CMD" "$WEBPACK_SERVER_CMD" "$WEBPACK_CLIENT_CMD" "$CP_PACKAGE" "$CP_TEMPLATES"

exit 0
