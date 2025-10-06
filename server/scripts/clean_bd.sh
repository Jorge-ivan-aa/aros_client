#!/bin/bash

sudo docker compose down
sudo rm -r .data/
sudo docker compose up &>/dev/null &

