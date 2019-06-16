#define ECO_FPS 1000 / 1
#define SLOW_FPS 1000 / 10
#define MEDIUM_FPS 1000 / 32
#define FAST_FPS 1000 / 400

int pleiadesLoopWaitingModeFPS = 0;
void PleiadesLoop()
{
  //set SharedFPS
  if (pleiadesLoopWaitingModeFPS <= 0)
  {
    sharedFPS = SLOW_FPS;
    pleiadesLoopWaitingModeFPS = 5000;
  }

  //Network
  doLoopNetwork();

  //FeatureManager
  doLoopFeatures();

  //ShowLight
  showLightFeature();
  pleiadesLoopWaitingModeFPS--;

  int corrTimer = sharedFPS - (millis() - StartTime);
  //Serial.println(corrTimer);
  if (corrTimer > 0)
    FastLED.delay(corrTimer);
}

void pleiadesFastMode()
{
  sharedFPS = FAST_FPS;
  pleiadesLoopWaitingModeFPS = 200;
}

void preLoop()
{
  if (MODE_POWER)
  {
    PleiadesLoop();
  }
  else
  {
    AllOnShow(CRGB::Black);
    delay(ECO_FPS);
    doLoopNetwork();
  }
}
