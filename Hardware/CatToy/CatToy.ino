//////////////////////////// CAT TOY /////////////////////////

#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <Servo.h>

// Config Firebase
#define FIREBASE_HOST "catoi-3606.firebaseio.com"
#define FIREBASE_AUTH ""

// Config connect WiFi
#define WIFI_SSID ""
#define WIFI_PASSWORD ""

int i;
int Button;
String Status;
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
    servo.attach(2); // 2 means D4 pin of ESP8266
    servo.write(90);
    delay(0);

}

void loop() {

  if (Firebase.failed()) {
    Serial.print("Firebase Failed");
    Serial.println(Firebase.error());  
    return;
  }

  Button = Firebase.getInt("TOY/Button");
  Status = Firebase.getString("TOY/Status");

  if (Status == "on") {
    servo.attach(2);

    for(i = 0; i < Button; i++){

      Serial.println("CW");
      servo.write(60);
      delay(500);
      Serial.println("90");
      servo.write(90);
      delay(500);
      
      Serial.println("CCW");
      servo.write(120);
      delay(500);
      Serial.println("90");
      servo.write(90);
      delay(500);
    }
    Serial.print("i: ");
    Serial.println(i);

    if(i == Button){
      Serial.println("End");
      servo.detach();
      Status = "off";
    }
  }

  Firebase.setString("TOY/Status", Status);
  Serial.println("Status: " + Status);
  delay(5000);
  
}

