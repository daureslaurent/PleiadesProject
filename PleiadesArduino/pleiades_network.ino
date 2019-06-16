//Interface between server & hardware

void jsonDispatcher(String jsonData)
{
  //parse to JSON
  DynamicJsonDocument doc(512);
  //StaticJsonDocument<512> doc;
  DeserializationError err = deserializeJson(doc, jsonData);
  if (err)
  {
    Serial.println("parserMLP: ERR JSON\n");
  }
  else
  {
    const char *cmd = doc["cmd"];
    String cmdStr((char *)cmd);
    Serial.print("cmdStr[");
    Serial.print(cmdStr);
    Serial.println("]");

    //Dispatch cmd
    if (cmdStr.equals("setColor"))
    {
      if (doc["data"]["fade"] > 0)
      {
        setColorFadeJson(doc["data"]);
      }
      else
      {
        setColorJson(doc["data"]);
      }
    }
    else if (cmdStr.equals("setBrightness"))
      setBrightnessJson(doc["data"]);
    else if (cmdStr.equals("setPower"))
      setPower(doc["data"]);
  }
}

void doCallbackNetwork(char *topic, byte *payload, unsigned int length)
{
  pleiadesFastMode();
  String retTopic((char *)topic);
  payload[length] = 0;
  String ret((char *)payload);

  Serial.print("topic received: ");
  Serial.println(retTopic);
  Serial.print("payload received: ");
  Serial.println(ret);

  if (retTopic.equals("ledlamp/json"))
    jsonDispatcher(ret);
  else if (retTopic.equals("ledlamp/set"))
  {
    if (ret.equals("ident"))
    {
      sendIdent();
    }
  }
}

void doLoopNetwork()
{
  /* if client was disconnected then try to reconnect again */
  if (!client.connected())
  {
    mqttconnect();
  }
  client.loop();
}
