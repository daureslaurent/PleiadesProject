String getPageConf()
{
    String dataPage = "";

    //<autoStart>
    dataPage += "<!doctype html>\r\n<html lang=\"fr\">\r\n<head>\r\n  <meta charset=\"utf-8\">\r\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"bootstrap.css\">\r\n  <title>Pleiades config</title>\r\n\r\n</head>\r\n<body style=\"background-color: lightgrey\">\r\n  <br>\r\n  <div class=\"container-fluid\">\r\n    <br>\r\n    <div class=\"card mx-auto\" style=\"width: 18rem;\">\r\n      <div class=\"card-header\">Pleiades Config</div>\r\n      <div id=\"alert\"></div>\r\n      <div class=\"card-body\">\r\n        <div class=\"card-content\">\r\n          <form id=\"configForm\" action=\"./\" method=\"get\">\r\n            <div id='scanList'></div>\r\n\r\n            <div class=\"input-group mb-3\">\r\n              <div class=\"input-group-prepend\">\r\n                <span class=\"input-group-text\" id=\"basic-addon1\">@</span>\r\n              </div>\r\n              <input type=\"password\" id=\"iPass\" class=\"form-control\" placeholder=\"Password\" name=\"password\">\r\n            </div>\r\n\r\n            <div class=\"input-group mb-3\">\r\n              <div class=\"input-group-prepend\">\r\n                <span class=\"input-group-text\" id=\"basic-addon1\">@</span>\r\n              </div>\r\n              <input type=\"text\" id=\"iMqtt\" class=\"form-control\" placeholder=\"MQTT Host\" name=\"mqtt\">\r\n            </div>\r\n\r\n            <div class=\"text-center\">\r\n              <div class=\"btn btn-outline-primary\" onclick=\"sendForm()\">OK</div>\r\n            </div>\r\n          </form>\r\n\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n\r\n\r\n  </div>\r\n</body>\r\n</html>\r\n\r\n<script>\r\n  function addWifi(name, signal){\r\n    var input0 = document.createElement('div');\r\n    input0.setAttribute('class', 'input-group mb-3');\r\n\r\n    var input1 = document.createElement('div');\r\n    input1.setAttribute('class', 'input-group-prepend');\r\n\r\n    var input2 = document.createElement('div');\r\n    input2.setAttribute('class', 'input-group-text');\r\n\r\n    //Radiobtn\r\n    var i2Input = document.createElement('input');\r\n    i2Input.setAttribute('type', 'radio');\r\n    i2Input.setAttribute('name', 'ssid');\r\n    i2Input.setAttribute('value', name);\r\n    i2Input.setAttribute('onchange', 'onCheckWifi()');\r\n\r\n    var label = document.createElement('label');\r\n    label.setAttribute('class', 'form-control');\r\n    label.innerHTML = name + ' : ' + signal;\r\n\r\n    input2.appendChild(i2Input);\r\n    input1.appendChild(input2);\r\n    input0.appendChild(input1);\r\n    input0.appendChild(label);\r\n\r\n    document.getElementById('scanList').appendChild(input0);\r\n  }\r\n\r\n  var checkWifi = false;\r\n  function onCheckWifi(){\r\n    checkWifi = true;\r\n  }\r\n\r\n  function sendForm(){\r\n\r\n    //check wifi/pass/mqtt\r\n    var checkPass = (document.getElementById(\"iPass\").value)?true:false;\r\n    var checkMQTT = (document.getElementById(\"iMqtt\").value)?true:false;\r\n    console.log(checkWifi, checkPass, checkMQTT);\r\n\r\n    //clean\r\n    document.getElementById(\"alert\").innerHTML = \"\";\r\n\r\n    //showAlert\r\n    if (!checkWifi || !checkPass || !checkMQTT){\r\n      var textAlert = \"\";\r\n      textAlert += (!checkWifi)?'Wifi ':'';\r\n      textAlert += (!checkPass)?'Password ':'';\r\n      textAlert += (!checkMQTT)?'MQTT Host ':'';\r\n\r\n      //create alert\r\n      var alert = document.createElement('div');\r\n      alert.setAttribute('class', 'alert alert-danger');\r\n      alert.setAttribute('role', 'alert');\r\n      alert.innerHTML = \"Need \"+textAlert;\r\n      document.getElementById(\"alert\").appendChild(alert);\r\n    }\r\n    else {\r\n      document.getElementById(\"configForm\").submit();\r\n    }\r\n  }\r\n</script>";
    //<autoEnd>

    return dataPage;
}

String injectDataScan()
{
    String wifiScanStr = "<script>";

    for (int i = 0; i < SW_nn; ++i)
    {
        wifiScanStr += "addWifi('" + SW_name[i] + "'," + SW_signal[i] + ");\r\n";
    }

    //addWifi('MyWifiTest', -52);\r\n
    return wifiScanStr + "</script>";
}

String getPageWifiSet()
{
    String finalPage = "";

    //Inject base Page
    finalPage += getPageConf();

    //Inject WifiScan
    finalPage += injectDataScan();

    return finalPage;
}
