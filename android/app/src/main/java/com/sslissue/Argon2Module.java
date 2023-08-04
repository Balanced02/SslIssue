package com.sslissue;

// 1. Import necessary libraries
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.lambdapioneer.argon2kt.Argon2Kt;

import java.nio.charset.StandardCharsets;

public class Argon2Module extends ReactContextBaseJavaModule {
  // 2. Constructor
  Argon2Module(ReactApplicationContext context) {
      super(context);
  }

  // 3. getName method
  @Override
  public String getName() {
      return "Argon2Module";
  }

  // 4. Method to be exposed to JavaScript
  @ReactMethod
  public void getKeyFromPasswordWithArgon2(String password, String salt, int parallelism, int iterations, int memorySize, int hashLength, Promise promise) {
    try {
      // Convert the password and salt to byte arrays
      byte[] passwordBytes = password.getBytes(StandardCharsets.UTF_8);
      byte[] saltBytes = salt.getBytes(StandardCharsets.UTF_8);

      // Create an Argon2Kt instance and hash the password
      Argon2Kt argon2Kt = new Argon2Kt();
      byte[] hashBytes = argon2Kt.hash(passwordBytes, saltBytes, parallelism, iterations, memorySize, hashLength);

      // Convert the byte array to a hexadecimal string
      StringBuilder result = new StringBuilder();
      for (byte b : hashBytes) {
        result.append(String.format("%02x", b));
      }

      // Resolve the promise with the hash
      promise.resolve(result.toString());
    } catch (Throwable e) {
      promise.reject("ERROR", e);
    }
  }
}
