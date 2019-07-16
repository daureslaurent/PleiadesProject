# Pleiades Server

NodeJS server for PleiadesProject, it use MongoDB for DB

## Development server

Run `node .` or with bunyan for better logs `node . | bunyan -o short`.
The server use the port 8010 by default for API.
MQTT broker needed.

## Config file

The config file locate to `./api/config.json`
There is the "API" port, mongoDB endpoint and the MQTT endpoint
