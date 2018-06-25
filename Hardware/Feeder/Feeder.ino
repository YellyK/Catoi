//////////////////////////// Get Value from Firebase /////////////////////////

#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <Servo.h>

// Config Firebase
#define FIREBASE_HOST "catoi-3606.firebaseio.com"
#define FIREBASE_AUTH ""

// Config connect WiFi
#define WIFI_SSID ""
#define WIFI_PASSWORD ""


String status;
Servo servo;

void setup() {

  Serial.begin(115200);  

  // Wifi Setup //
  WiFi.mode(WIFI_STA);
    // connect to wifi.
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("connecting");
  
    while (WiFi.status() != WL_CONNECTED) {
      Serial.print(".");
      delay(500);
    }

    Serial.println();
    Serial.print("connected: ");
    Serial.println(WiFi.localIP());

    // Firebase Setup //
    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  // ESP8622 Setup //
    servo.attach(15); // 15 means D8 pin of ESP8266
    servo.write(100); //Setup angle
    delay(2000);

}

void loop() {
  
  if (Firebase.failed()) {
    Serial.print("Firebase Failed");
    Serial.println(Firebase.error());  
    return;
  }
  servo.attach(15);
  servo.write(100);
  status = Firebase.getString("FEED_STATUS/status");
  Serial.println("Status: " + status);

  if(status == "on") {
    servo.write(45); // Open angle
    Serial.println("Servo: Open");
    delay(500) ;
    servo.write(100); // Close angle
    Serial.println("Servo: Close");
    status = "off";
    delay(2000);
    servo.detach();
  }
  
  Firebase.setString("FEED_STATUS/status", status);
  Serial.println("Status: " + status);
  delay(5000);
}

