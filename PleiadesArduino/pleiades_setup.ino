#include <WiFi.h>
#include <Preferences.h>
// to Non-volatile storage (NVS)
// see https://github.com/espressif/arduino-esp32/blob/master/libraries/Preferences/examples/StartCounter/StartCounter.ino

#define AP_NAME "pleiades-pre"

WiFiClient myclient;
WiFiServer server(80);
String WebRequestHostAddress;
Preferences preferences; // we must generate this object of the preference library

String wifiSSID = "";
String wifiPassword = "";
String hostMQTT = "";

String webserver_GetRequestGETParameter()
{
    String GETParameter = "";

    myclient = server.available(); // listen for incoming clients

    //Serial.print(".");

    if (myclient)
    {                                  // if you get a client,
        Serial.println("New Client."); // print a message out the serial port
        String currentLine = "";       // make a String to hold incoming data from the client

        while (myclient.connected())
        { // loop while the client's connected

            if (myclient.available())
            { // if there's bytes to read from the client,

                char c = myclient.read(); // read a byte, then
                Serial.write(c);          // print it out the serial monitor

                if (c == '\n')
                { // if the byte is a newline character

                    // if the current line is blank, you got two newline characters in a row.
                    // that's the end of the client HTTP request
                    if (currentLine.length() == 0)
                    {

                        if (GETParameter == "")
                        {
                            GETParameter = "-";
                        }; // if no "GET /?" was found so far in the request bytes, return "-"

                        // break out of the while loop:
                        break;
                    }
                    else
                    { // if you got a newline, then clear currentLine:
                        currentLine = "";
                    }
                }
                else if (c != '\r')
                {                     // if you got anything else but a carriage return character,
                    currentLine += c; // add it to the end of the currentLine
                }

                if (c == '\r' && currentLine.startsWith("GET /?"))
                // we see a "GET /?" in the HTTP data of the client request
                // user entered ADDRESS/?xxxx in webbrowser, xxxx = GET Parameter
                {

                    GETParameter = currentLine.substring(currentLine.indexOf('?') + 1, currentLine.indexOf(' ', 6)); // extract everything behind the ? and before a space
                }

                if (c == '\r' && currentLine.startsWith("Host:"))
                // we see a "Host:" in the HTTP data of the client request
                // user entered ADDRESS or ADDRESS/... in webbrowser, ADDRESS = Server IP-Address of HTTP-Request
                {
                    int IndexOfBlank = currentLine.indexOf(' ');
                    WebRequestHostAddress = currentLine.substring(IndexOfBlank + 1, currentLine.length()); // extract everything behind the space character and store Server IP-Address of HTTP-Request
                }
            }
        }
    }

    return GETParameter;
}

// Send HTML page to client, as HTTP response
// client connection must be open (call Webserver_GetRequestGETParameter() first)
void Webserver_SendHTMLPage(String HTMLPage)
{
    String httpResponse = "";

    // begin with HTTP response header
    httpResponse += "HTTP/1.1 200 OK\r\n";
    httpResponse += "Content-type:text/html\r\n\r\n";

    // then the HTML page
    httpResponse += HTMLPage;

    // The HTTP response ends with a blank line:
    httpResponse += "\r\n";

    // send it out to TCP/IP client = webbrowser
    myclient.println(httpResponse);

    // close the connection
    myclient.stop();

    Serial.println("Client Disconnected.");
};

// +++++++++++++++++++ End of Webserver library +++++++++++++++++++++

// +++++++++++++++++++ Start of WiFi Library ++++++++++++++++++++++++

// Connect to router network and return 1 (success) or -1 (no success)
int connectWifi(char *txtSSID, char *txtPassword)
{
    int success = 1;

    // connect to WiFi network
    // see https://www.arduino.cc/en/Reference/WiFiBegin

    WiFi.begin(txtSSID, txtPassword);

    // we wait until connection is established
    // or 10 seconds are gone

    int WiFiConnectTimeOut = 0;
    while ((WiFi.status() != WL_CONNECTED) && (WiFiConnectTimeOut < 10))
    {
        delay(1000);
        WiFiConnectTimeOut++;
    }

    // not connected
    if (WiFi.status() != WL_CONNECTED)
    {
        success = -1;
    }

    // print out local address of ESP32 in Router network (LAN)
    Serial.println(WiFi.localIP());
    Serial.println(WiFi.RSSI());

    return success;
}

// Disconnect from router network and return 1 (success) or -1 (no success)
int WiFi_RouterNetworkDisconnect()
{
    int success = -1;

    WiFi.disconnect();

    int WiFiConnectTimeOut = 0;
    while ((WiFi.status() == WL_CONNECTED) && (WiFiConnectTimeOut < 10))
    {
        delay(1000);
        WiFiConnectTimeOut++;
    }

    // not connected
    if (WiFi.status() != WL_CONNECTED)
    {
        success = 1;
    }

    Serial.println("Disconnected.");

    return success;
}

// Initialize Soft Access Point with ESP32
// ESP32 establishes its own WiFi network, one can choose the SSID
void startAccessPoint(char *AccessPointNetworkSSID)
{
    WiFi.softAP(AccessPointNetworkSSID);

    // print ownIp => "192.168.4.1".
    Serial.print("IPAddr ");
    Serial.println(WiFi.softAPIP());
}

// +++++++++++++++++++ End of WiFi Library +++++++++++++++++++

String getValueSplit(String data, char separator, int index)
{
    int found = 0;
    int strIndex[] = {0, -1};
    int maxIndex = data.length() - 1;

    for (int i = 0; i <= maxIndex && found <= index; i++)
    {
        if (data.charAt(i) == separator || i == maxIndex)
        {
            found++;
            strIndex[0] = strIndex[1] + 1;
            strIndex[1] = (i == maxIndex) ? i + 1 : i;
        }
    }

    return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}

int setConfigParams(String GETParameter)
{

    int count = 0;
    int countP = 0;
    Serial.printf("GETDATA==[%s]\n", const_cast<char *>(GETParameter.c_str()));

    // count params
    int indexString = 0;
    while (indexString >= 0)
    {
        indexString = GETParameter.indexOf('=', indexString);
        count++;
        Serial.printf("indexString [%d]\n", indexString);
        indexString == -1 ? -1 : indexString++;
        Serial.printf("indexString [%d]\n", indexString);
    }

    Serial.printf("params found [%d]\n", count);

    while (countP < count)
    {

        String name = getValueSplit(getValueSplit(GETParameter, '&', countP), '=', 0);
        String value = getValueSplit(getValueSplit(GETParameter, '&', countP), '=', 1);

        Serial.printf("inParam[%s]\n", const_cast<char *>(name.c_str()));
        Serial.printf("inParam[%s]\nn", const_cast<char *>(value.c_str()));

        if (name.equals("ssid"))
        {
            preferences.putString("SSID", value);
        }
        else if (name.equals("password"))
        {
            preferences.putString("Password", value);
        }
        else if (name.equals("mqtt"))
        {
            preferences.putString("HostMQTT", value);
        }
        countP++;
    }
    return count;
}

void setConfigValueRAM(String ssidval, String pass, String mqtt)
{
    ssid = ssidval;
    password = pass;
    mqtt_server = mqtt;
}

boolean setupWifiConfig()
{
    preferences.begin("pleiades", false);
    Serial.println("Start WifiConfig");

    //Get data
    wifiSSID = preferences.getString("SSID", "");
    wifiPassword = preferences.getString("Password", "");
    hostMQTT = preferences.getString("HostMQTT", "");

    // convert it to char*
    char *txtSSID = const_cast<char *>(wifiSSID.c_str());
    char *txtPassword = const_cast<char *>(wifiPassword.c_str());
    char *txtMQTT = const_cast<char *>(hostMQTT.c_str());

    Serial.printf("SSID: %s\n", txtSSID);
    Serial.printf("Pass %s\n", txtPassword);
    Serial.printf("MQTT %s\n", txtMQTT);

    setConfigValueRAM(wifiSSID, wifiPassword, hostMQTT);

    //Station + AccesPoint
    WiFi.mode(WIFI_AP_STA);

    // try to connect to the LAN
    int connected = connectWifi(txtSSID, txtPassword);
    Serial.printf("Connection => %s\n", connected == 1 ? "connected" : "notConnected");
    if (connected == 1)
        return true;
    else
    {
        //Start WifiConfig
        startAccessPoint(AP_NAME);

        // start webServer
        server.begin();
        return false;
    }
}

void loopWifiConfig()
{
    //Get income
    String GETParameter = webserver_GetRequestGETParameter();
    //request input + parameters
    if (GETParameter.length() > 0)
    {
        if (GETParameter.length() > 1)
        {
            //set config from get Request
            int countValues = setConfigParams(GETParameter);
        }

        // Send page connection
        Webserver_SendHTMLPage(getPageConfiWifi());
    }

    delay(50);
}