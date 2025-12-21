package com.stroketext;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.SimpleViewManager;

// Note: After codegen runs, this will be updated to use generated interfaces
// For now, this is a basic implementation that will work with Fabric
public class StrokeTextViewComponentViewManager extends SimpleViewManager<StrokeTextView> {

    @NonNull
    @Override
    public String getName() {
        return "StrokeTextView";
    }

    @NonNull
    @Override
    protected StrokeTextView createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new StrokeTextView(reactContext);
    }

    @Override
    public LayoutShadowNode createShadowNodeInstance() {
        return new StrokeTextViewShadowNode();
    }

    @Override
    public Class<LayoutShadowNode> getShadowNodeClass() {
        return (Class<LayoutShadowNode>) (Class<?>) StrokeTextViewShadowNode.class;
    }

    // Prop setters - these will be called by codegen-generated code
    // After codegen runs, these may be replaced by generated methods
    public void setText(StrokeTextView view, @Nullable String text) {
        view.setText(text);
    }

    public void setFontSize(StrokeTextView view, double fontSize) {
        view.setFontSize((float) fontSize);
    }

    public void setColor(StrokeTextView view, @Nullable String color) {
        view.setTextColor(color);
    }

    public void setStrokeColor(StrokeTextView view, @Nullable String strokeColor) {
        view.setStrokeColor(strokeColor);
    }

    public void setStrokeWidth(StrokeTextView view, double strokeWidth) {
        view.setStrokeWidth((float) strokeWidth);
    }

    public void setFontFamily(StrokeTextView view, @Nullable String fontFamily) {
        view.setFontFamily(fontFamily);
    }

    public void setAlign(StrokeTextView view, @Nullable String align) {
        view.setTextAlignment(align);
    }

    public void setNumberOfLines(StrokeTextView view, int numberOfLines) {
        view.setNumberOfLines(numberOfLines);
    }

    public void setEllipsis(StrokeTextView view, boolean ellipsis) {
        view.setEllipsis(ellipsis);
    }

    public void setWidth(StrokeTextView view, double width) {
        view.setCustomWidth((float) width);
    }
}

