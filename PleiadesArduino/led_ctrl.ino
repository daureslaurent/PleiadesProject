void setupLed()
{
  manualColor = CRGB::Aqua;
  delay(3000); // 3 second delay for recovery
  FastLED.addLeds<LED_TYPE, DATA_PIN, CLK_PIN, COLOR_ORDER>(leds, NUM_LEDS).setCorrection(Typical8mmPixel);
  // set master brightness control
  FastLED.setBrightness(SETUP_BRIGHTNESS);
  FastLED.setTemperature(Tungsten100W);

  AllOnShow(CRGB::Black);
}

void AllOnShow(CRGB color)
{
  for (int i = 0; i < NUM_LEDS; i++)
  {
    leds[i] = color;
  }
  FastLED.show();
}

void AllOn(CRGB color)
{
  for (int i = 0; i < NUM_LEDS; i++)
  {
    leds[i] = color;
  }
}

void AlertLed(CRGB color)
{
  OneAfterOne(color, 3);
  delay(200);
  OneAfterOne(manualColor, 3);
}

void OneAfterOne(CRGB color)
{
  for (int i = 0; i < NUM_LEDS; i++)
  {
    leds[i] = color;
    FastLED.show();
    delay(25);
  }
}

void OneAfterOneFast(CRGB color)
{
  for (int i = 0; i < NUM_LEDS; i++)
  {
    leds[i] = color;
    FastLED.show();
    delay(10);
  }
}

void OneAfterOne(CRGB color, int duration)
{
  float durationF = duration / NUM_LEDS;
  for (int i = 0; i < NUM_LEDS; i++)
  {
    leds[i] = color;
    FastLED.show();
    delay(durationF);
  }
}
