int tryMqttNb = 0;

void sendSetMe()
{
  client.publish(TOPIC_SERVER, makeSetMe().c_str());
}

String makeSetMe()
{
  String JSONmaker = String("");
  JSONmaker += "{\"serialId\": \"";
  JSONmaker += serialId;
  JSONmaker += "\",\"cmd\": \"setMe\"}";
  return JSONmaker;
}

void sendIdent()
{
  client.publish(TOPIC_SERVER, makeIdent().c_str());
  Serial.printf("ident send msg [%s]\n", makeIdent().c_str());
}

String makeIdent()
{
  String JSONmaker = String("");
  JSONmaker += "{\"serialId\":\"";
  JSONmaker += serialId;
  JSONmaker += "\",\"cmd\":\"ident\",\"led\":{\"color\":{\"r\":";
  JSONmaker += manualColor.r;
  JSONmaker += ",\"g\":";
  JSONmaker += manualColor.g;
  JSONmaker += ",\"b\":";
  JSONmaker += manualColor.b;
  JSONmaker += "}}";
  JSONmaker += ",\"wifi\":{\"ssid\":\"";
  JSONmaker += ssid;
  JSONmaker += "\",\"signal\":";
  JSONmaker += String(WiFi.RSSI());
  JSONmaker += "}}";

  return JSONmaker;
}

void mqttconnect()
{
  /* Loop until reconnected */
  while (!client.connected())
  {
    AllOnShow((tryMqttNb > 0) ? CRGB::DarkOrange : (CRGB::Green));

    Serial.print("MQTT connecting ...");
    /* client ID */
    String clientId = "ESP32Client";
    /* connect now */
    if (client.connect(clientId.c_str()))
    {
      Serial.println("connected");
      /* subscribe topic with default QoS 0*/
      client.subscribe(TOPIC_SET);
      client.subscribe(TOPIC_JSON);
    }
    else
    {
      tryMqttNb++;
      AllOnShow(CRGB::Red);
      Serial.print("try number: ");
      Serial.print(tryMqttNb);
      Serial.print("\nfailed, status code =");
      Serial.print(client.state());
      Serial.println("try again in 5 seconds");
      /* Wait 5 seconds before retrying */
      delay(5000);
    }
  }
}

void setupMQTT()
{
  Serial.println(WiFi.localIP());

  Serial.printf("mqtt host [%s]\n", mqtt_server.c_str());
  /* configure the MQTT server with IPaddress and port */
  client.setServer(mqtt_server.c_str(), 1883);
  client.setCallback(doCallbackNetwork);
  mqttconnect();
  delay(400);
  sendSetMe();
  delay(400);
}

void loopMQTT()
{
  /* if client was disconnected then try to reconnect again */
  if (!client.connected())
  {
    mqttconnect();
  }
  client.loop();
}
