void doLoopFeatures(){
  if (currentFeature == FEATURE_BASE){
    doPleiadesFeatureBase();
  }
}

void showLightFeature(){
  FastLED.setBrightness(currentBrightness);
  FastLED.show();
}

