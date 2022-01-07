#!/usr/bin/env bash

PROJECT_NAME="ca2"
DROPLET_URL="164.90.231.187"

echo "##############################"
echo "Building the frontend project"
echo "##############################"
npm run build

echo "##############################"
echo "Deploying Frontend project..."
echo "##############################"

scp -r ./build/* root@$DROPLET_URL:/var/www/$PROJECT_NAME

echo
echo
echo
echo "Done. Closing window."

sleep 3
