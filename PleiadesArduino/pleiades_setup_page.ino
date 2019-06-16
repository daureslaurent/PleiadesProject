
String getPageConfiWifi()
{
    String configPage = "<!doctype html>\r\n<html lang=\"fr\">\r\n<head>\r\n";
    configPage += "<meta charset=\"utf-8\">\r\n";
    configPage += "<title>Titre de la page</title>\r\n";
    configPage += "<link rel=\"stylesheet\" href=\"style.css\">\r\n";
    configPage += "<script src=\"script.js\"></script>\r\n</head>\r\n<body>\r\n";
    configPage += "<form action=\"./\" method=\"get\">\r\n";
    configPage += "SSID:<br>\r\n";
    configPage += "<input type=\"text\" name=\"ssid\" value=";
    //Default SSID
    configPage += "\"Livebox-9916\"";
    configPage += "><br>\r\nPassword:<br>\r\n ";
    configPage += "<input type=\"text\" name=\"password\" value=";
    //Default Password
    configPage += "\"aXfQHyPzKUVcUufkd4\"";
    configPage += "><br>\r\n";
    configPage += "MQTT Host:<br>\r\n";
    configPage += "<input type=\"text\" name=\"mqtt\" value=";
    //Default Host MQTT
    configPage += "\"192.168.1.28\"";
    configPage += "><br><br>\r\n";
    configPage += "<input type=\"submit\" value=\"Submit\">\r\n</form>\r\n</body>\r\n</html>";
    return configPage;
}