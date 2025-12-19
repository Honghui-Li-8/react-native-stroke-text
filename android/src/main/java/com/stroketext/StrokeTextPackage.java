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

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    // Check if New Architecture is enabled by checking for Fabric classes
    boolean isNewArchitectureEnabled = false;
    try {
      // Try to load a Fabric-specific class to detect New Architecture
      Class.forName("com.facebook.react.fabric.FabricUIManager");
      isNewArchitectureEnabled = true;
    } catch (ClassNotFoundException e) {
      // Fabric classes not found, using old architecture
      isNewArchitectureEnabled = false;
    }

    if (isNewArchitectureEnabled) {
      // Return Fabric manager for New Architecture
      return Arrays.<ViewManager>asList(new StrokeTextViewFabricManager());
    } else {
      // Return old architecture manager
      return Arrays.<ViewManager>asList(new StrokeTextViewManager());
    }
  }
}