package com.stroketext;

import android.view.View;
import androidx.annotation.Nullable;
import com.facebook.react.uimanager.ViewManagerDelegate;

public class StrokeTextViewManagerDelegate<T extends View> implements ViewManagerDelegate<T> {
    @Override
    public void setProperty(T view, String propName, @Nullable Object value) {
        StrokeTextView strokeView = (StrokeTextView) view;
        switch (propName) {
            case "text":
                if (value instanceof String) {
                    strokeView.setText((String) value);
                }
                break;
            case "fontSize":
                if (value instanceof Number) {
                    strokeView.setFontSize(((Number) value).floatValue());
                }
                break;
            case "color":
                if (value instanceof String) {
                    strokeView.setTextColor((String) value);
                }
                break;
            case "strokeColor":
                if (value instanceof String) {
                    strokeView.setStrokeColor((String) value);
                }
                break;
            case "strokeWidth":
                if (value instanceof Number) {
                    strokeView.setStrokeWidth(((Number) value).floatValue());
                }
                break;
            case "fontFamily":
                if (value instanceof String) {
                    strokeView.setFontFamily((String) value);
                }
                break;
            case "align":
                if (value instanceof String) {
                    strokeView.setTextAlignment((String) value);
                }
                break;
            case "numberOfLines":
                if (value instanceof Number) {
                    strokeView.setNumberOfLines(((Number) value).intValue());
                }
                break;
            case "ellipsis":
                if (value instanceof Boolean) {
                    strokeView.setEllipsis((Boolean) value);
                }
                break;
            case "width":
                if (value instanceof Number) {
                    strokeView.setCustomWidth(((Number) value).floatValue());
                }
                break;
        }
    }

    @Override
    public void receiveCommand(T view, String commandName, @Nullable com.facebook.react.bridge.ReadableArray args) {
        // No commands needed for this component
    }
}

