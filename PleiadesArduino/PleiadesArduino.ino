#include "WiFi.h"
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "FastLED.h"
//#define MQTT_MAX_PACKET_SIZE 256
#if defined(FASTLED_VERSION) && (FASTLED_VERSION < 3001000)
#warning "Requires FastLED 3.1 or later; check github for latest code."
#endif

// -- Hardware Settings --
#define DATA_PIN 12
#define CLK_PIN 13
#define NAME_HARDWARE "PLEIADES-PR01"
#define serialId "PR0"

bool MODE_POWER = true;

// -- MQTT --
#define TOPIC_SET "ledlamp/set"
#define TOPIC_JSON "ledlamp/json"
#define TOPIC_SERVER "ledlamp/server"

// -- LED --
#define LED_TYPE WS2801
#define COLOR_ORDER RGB
#define NUM_LEDS 50
#define BRIGHTNESS 30
#define SETUP_BRIGHTNESS 2
#define FRAMES_PER_SECOND 150
CRGB leds[NUM_LEDS];

#define FEATURE_BASE 1
int currentFeature = FEATURE_BASE;
int currentBrightness = BRIGHTNESS;
int sharedFPS;
int ledStars_currentActive = 0;

//LedIot

//Wifi
String ssid;
String password;
String mqtt_server;

CRGB manualColor;

/* create an instance of PubSubClient client */
WiFiClient espClient;
PubSubClient client(espClient);

long lastMsg = 0;
char msg[20];
const int sensorPort = 10;

bool bri_status = false;

/* MQTT */

boolean isConnectedWifi = true;

void setup()
{
  Serial.begin(115200);
  setupLed();
  isConnectedWifi = setupWifiConfig();
  if (isConnectedWifi)
    setupMQTT();
}

unsigned long StartTime;

void loop()
{
  if (!isConnectedWifi)
  {
    loopWifiConfig();
  }
  else
  {
    StartTime = millis();
    preLoop();
  }
}
