// FEATURE PART
#define PLEIADES_BASE_FADING 1
#define PLEIADES_BASE_NORMAL 0

int pleiadesBaseSelectorMode = PLEIADES_BASE_NORMAL;
CRGB baseFeatureColor;

void doPleiadesFeatureBase()
{
  if (pleiadesBaseSelectorMode == 0)
  {
    AllOn(baseFeatureColor);
  }
  else if (pleiadesBaseSelectorMode == 1)
  {
    pleiadesBaseFade();
    AllOn(baseFeatureColor);
  }
}

// PROCESS PART
CRGB pleiadesBaseTargetColor;
CRGB pleiadesBaseBaseColor;

int16_t pleiadesBaseUnitStep;
int16_t pleiadesBaseCurrentStep;

int16_t pleiadesBaseTotalStep;

int16_t pleiadesBaseTmpI;

int16_t pleiadesBaseRedDiff;
int16_t pleiadesBaseGreenDiff;
int16_t pleiadesBaseBlueDiff;

int pleiadesBaseSecEffect = 120;

void pleiadesBaseFade()
{
  if (pleiadesBaseTmpI < pleiadesBaseTotalStep)
  {
    baseFeatureColor.r = (int16_t)pleiadesBaseBaseColor.r + (pleiadesBaseRedDiff * pleiadesBaseTmpI / pleiadesBaseTotalStep);
    baseFeatureColor.g = (int16_t)pleiadesBaseBaseColor.g + (pleiadesBaseGreenDiff * pleiadesBaseTmpI / pleiadesBaseTotalStep);
    baseFeatureColor.b = (int16_t)pleiadesBaseBaseColor.b + (pleiadesBaseBlueDiff * pleiadesBaseTmpI / pleiadesBaseTotalStep);
    pleiadesBaseTmpI++;
    sharedFPS = 1000 / (pleiadesBaseSecEffect);
    manualColor = baseFeatureColor;
  }
  else
  {
    pleiadesBaseSelectorMode = PLEIADES_BASE_NORMAL;
  }
}

// NETWORK PART

void setColorFadeJson(JsonObject json)
{
  JsonObject data_color = json["color"];
  int16_t data_color_r = data_color["r"];
  int16_t data_color_g = data_color["g"];
  int16_t data_color_b = data_color["b"];
  int data_fade = json["fade"];

  pleiadesBaseBaseColor.r = baseFeatureColor.r;
  pleiadesBaseBaseColor.g = baseFeatureColor.g;
  pleiadesBaseBaseColor.b = baseFeatureColor.b;

  pleiadesBaseRedDiff = data_color_r - pleiadesBaseBaseColor.r;
  pleiadesBaseGreenDiff = data_color_g - pleiadesBaseBaseColor.g;
  pleiadesBaseBlueDiff = data_color_b - pleiadesBaseBaseColor.b;

  pleiadesBaseTotalStep = data_fade / (1000 / (pleiadesBaseSecEffect));

  pleiadesBaseTmpI = 0;
  pleiadesBaseSelectorMode = PLEIADES_BASE_FADING;
}

void setColorJson(JsonObject json)
{
  JsonObject data_color = json["color"];
  int data_color_r = data_color["r"];
  int data_color_g = data_color["g"];
  int data_color_b = data_color["b"];
  int data_fade = json["fade"];

  pleiadesBaseSelectorMode = PLEIADES_BASE_NORMAL;
  baseFeatureColor = CRGB(data_color_r, data_color_g, data_color_b);
  //msg ident
  manualColor = baseFeatureColor;
}

void setBrightnessJson(JsonObject json)
{
  int data_brightness = json["brightness"];
  currentBrightness = data_brightness;
}

void setPower(JsonObject json)
{
  MODE_POWER = json["power"];
}