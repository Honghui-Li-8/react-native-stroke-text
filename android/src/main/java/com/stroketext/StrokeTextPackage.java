package com.stroketext;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class StrokeTextPackage implements ReactPackage {
  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

  private static boolean isNewArchitectureEnabled = false;
  private static boolean architectureChecked = false;
  
  private static boolean checkNewArchitecture() {
    if (!architectureChecked) {
      try {
        Class.forName("com.facebook.react.fabric.FabricUIManager");
        isNewArchitectureEnabled = true;
      } catch (ClassNotFoundException e) {
        isNewArchitectureEnabled = false;
      }
      architectureChecked = true;
    }
    return isNewArchitectureEnabled;
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    if (checkNewArchitecture()) {
      // Return Fabric manager for New Architecture
      return Arrays.<ViewManager>asList(new StrokeTextViewFabricManager());
    } else {
      // Return old architecture manager
      return Arrays.<ViewManager>asList(new StrokeTextViewManager());
    }
  }
}