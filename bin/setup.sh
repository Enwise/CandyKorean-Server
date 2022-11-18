#!/bin/bash

#update apt
sudo apt-get install update

#install git, nginx, node
sudo apt install -y git
sudo apt install -y nginx
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
node -v
npm -v
sudo npm install pm2 -g
sudo npm install typescript @types/node -g