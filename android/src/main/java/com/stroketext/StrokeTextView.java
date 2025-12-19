package com.stroketext;

import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Typeface;
import android.text.Layout;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.text.TextUtils;
import android.util.TypedValue;
import android.view.View;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;

import java.util.HashMap;
import java.util.Map;

class StrokeTextView extends View {
    private String text = "";
    private float fontSize = 14;
    private int textColor = 0xFF000000;
    private int strokeColor = 0xFFFFFFFF;
    private float strokeWidth = 1;
    private String fontFamily = "sans-serif";
    private int numberOfLines = 0;
    private boolean ellipsis = false;
    private final TextPaint textPaint;
    private final TextPaint strokePaint;
    private Layout.Alignment alignment = Layout.Alignment.ALIGN_CENTER;
    private StaticLayout textLayout;
    private StaticLayout strokeLayout;
    private boolean layoutDirty = true;
    private float customWidth = 0;
    private final Map<String, Typeface> fontCache = new HashMap<>();
    private int lastReportedWidth = -1;
    private int lastReportedHeight = -1;

    public StrokeTextView(ThemedReactContext context) {
        super(context);
        textPaint = new TextPaint(Paint.ANTI_ALIAS_FLAG);
        strokePaint = new TextPaint(Paint.ANTI_ALIAS_FLAG);
    }

    private void ensureLayout() {
        if (layoutDirty) {
            Typeface typeface = getFont(fontFamily);
            textPaint.setTypeface(typeface);
            textPaint.setTextSize(fontSize);
            textPaint.setColor(textColor);
            strokePaint.setStyle(Paint.Style.STROKE);
            strokePaint.setStrokeJoin(Paint.Join.ROUND);
            strokePaint.setStrokeCap(Paint.Cap.ROUND);
            strokePaint.setStrokeWidth(strokeWidth);
            strokePaint.setColor(strokeColor);
            strokePaint.setTypeface(typeface);
            strokePaint.setTextSize(fontSize);

            int width = (int) getCanvasWidth();
            CharSequence ellipsizedText = ellipsis ? TextUtils.ellipsize(text, textPaint, width, TextUtils.TruncateAt.END) : text;
            textLayout = new StaticLayout(ellipsizedText, textPaint, width, alignment, 1.0f, 0.0f, false);
            if (numberOfLines > 0 && numberOfLines < textLayout.getLineCount()) {
                int lineEnd = textLayout.getLineEnd(numberOfLines - 1);
                ellipsizedText = ellipsizedText.subSequence(0, lineEnd);
                textLayout = new StaticLayout(ellipsizedText, textPaint, width, alignment, 1.0f, 0.0f, false);
            }
            strokeLayout = new StaticLayout(ellipsizedText, strokePaint, width, alignment, 1.0f, 0.0f, false);

            layoutDirty = false;
        }
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        layoutDirty = true;
        ensureLayout();
    }

    private float getCanvasWidth() {
        if (customWidth > 0) {
            return getScaledSize(customWidth);
        }

        String[] lines = text.split("\n");
        float maxLineWidth = 0;
        for (String line : lines) {
            float lineWidth = textPaint.measureText(line);
            if (lineWidth > maxLineWidth) {
                maxLineWidth = lineWidth;
            }
        }

        maxLineWidth += getScaledSize(strokeWidth) / 2;
        return maxLineWidth;
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        ensureLayout();
        if (textLayout != null && strokeLayout != null) {
            strokeLayout.draw(canvas);
            textLayout.draw(canvas);
            
            // Only update size for old architecture, and only when size changes
            if (!checkNewArchitecture()) {
                int width = textLayout.getWidth();
                int height = textLayout.getHeight();
                if (width != lastReportedWidth || height != lastReportedHeight) {
                    updateSize(width, height);
                    lastReportedWidth = width;
                    lastReportedHeight = height;
                }
            }
            // For Fabric, onMeasure() handles sizing automatically
        }
    }

    private float getScaledSize(float size) {
        return TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_SP, size, getResources().getDisplayMetrics());
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

    private void updateSize(int width, int height) {
        ReactContext reactContext = (ReactContext) getContext();
        
        if (checkNewArchitecture()) {
            // For New Architecture (Fabric), size updates are handled automatically by the layout system
            // We just need to request layout, and Fabric will handle the rest
            post(new Runnable() {
                @Override
                public void run() {
                    requestLayout();
                }
            });
        } else {
            // For Old Architecture, use UIManagerModule
            reactContext.runOnNativeModulesQueueThread(
                    new Runnable() {
                        @Override
                        public void run() {
                            UIManagerModule uiManager = reactContext.getNativeModule(UIManagerModule.class);
                            if (uiManager != null) {
                                uiManager.updateNodeSize(getId(), width, height);
                            }
                        }
                    });
        }
    }
    
    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        // Safety check: ensure textPaint is initialized before calling ensureLayout
        if (textPaint == null || strokePaint == null) {
            super.onMeasure(widthMeasureSpec, heightMeasureSpec);
            return;
        }
        
        // Ensure layout is calculated
        if (textLayout == null || layoutDirty) {
            ensureLayout();
        }
        
        if (textLayout != null) {
            int width = textLayout.getWidth();
            int height = textLayout.getHeight();
            setMeasuredDimension(width, height);
        } else {
            // Fallback if layout couldn't be created (e.g., empty text)
            super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        }
    }

    public void setText(String text) {
        if (!this.text.equals(text)) {
            this.text = text;
            layoutDirty = true;
            lastReportedWidth = -1;
            lastReportedHeight = -1;
            invalidate();
        }
    }

    public void setFontSize(float fontSize) {
        float scaledFontSize = getScaledSize(fontSize);
        if (this.fontSize != scaledFontSize) {
            this.fontSize = scaledFontSize;
            layoutDirty = true;
            lastReportedWidth = -1;
            lastReportedHeight = -1;
            invalidate();
        }
    }

    public void setTextColor(String color) {
        int parsedColor = parseColor(color);
        if (this.textColor != parsedColor) {
            this.textColor = parsedColor;
            layoutDirty = true;
            invalidate();
        }
    }

    public void setStrokeColor(String color) {
        int parsedColor = parseColor(color);
        if (this.strokeColor != parsedColor) {
            this.strokeColor = parsedColor;
            layoutDirty = true;
            invalidate();
        }
    }

    public void setStrokeWidth(float strokeWidth) {
        float scaledStrokeWidth = getScaledSize(strokeWidth);
        if (this.strokeWidth != scaledStrokeWidth) {
            this.strokeWidth = scaledStrokeWidth;
            layoutDirty = true;
            lastReportedWidth = -1;
            lastReportedHeight = -1;
            invalidate();
        }
    }

    public void setFontFamily(String fontFamily) {
        if (!this.fontFamily.equals(fontFamily)) {
            this.fontFamily = fontFamily;
            layoutDirty = true;
            invalidate();
        }
    }

    public void setTextAlignment(String alignment) {
        Layout.Alignment newAlignment;
        if ("left".equals(alignment)) {
            newAlignment = Layout.Alignment.ALIGN_NORMAL;
        } else if ("right".equals(alignment)) {
            newAlignment = Layout.Alignment.ALIGN_OPPOSITE;
        } else if ("center".equals(alignment)) {
            newAlignment = Layout.Alignment.ALIGN_CENTER;
        } else {
            newAlignment = this.alignment;
        }
        if (this.alignment != newAlignment) {
            this.alignment = newAlignment;
            layoutDirty = true;
            lastReportedWidth = -1;
            lastReportedHeight = -1;
            invalidate();
        }
    }

    public void setNumberOfLines(int numberOfLines) {
        if (this.numberOfLines != numberOfLines) {
            this.numberOfLines = numberOfLines;
            layoutDirty = true;
            lastReportedWidth = -1;
            lastReportedHeight = -1;
            invalidate();
        }
    }

    public void setEllipsis(boolean ellipsis) {
        if (this.ellipsis != ellipsis) {
            this.ellipsis = ellipsis;
            layoutDirty = true;
            lastReportedWidth = -1;
            lastReportedHeight = -1;
            invalidate();
        }
    }

    public void setCustomWidth(float width) {
        if (!(this.customWidth == width)) {
            this.customWidth = width;
            layoutDirty = true;
            lastReportedWidth = -1;
            lastReportedHeight = -1;
            invalidate();
        }
    }

    private int parseColor(String color) {
        if (color.startsWith("#")) {
            return Color.parseColor(color);
        } else if (color.startsWith("rgb")) {
            return parseRgbColor(color);
        }

        return 0xFF000000;
    }

    private int parseRgbColor(String color) {
        String[] parts = color.replaceAll("[rgba()\\s]", "").split(",");
        int r = Integer.parseInt(parts[0]);
        int g = Integer.parseInt(parts[1]);
        int b = Integer.parseInt(parts[2]);
        int a = parts.length > 3 ? (int) (Float.parseFloat(parts[3]) * 255) : 255;
        return Color.argb(a, r, g, b);
    }

    private Typeface getFont(String fontFamily) {
        if (fontCache.containsKey(fontFamily)) {
            return fontCache.get(fontFamily);
        } else {
            Typeface typeface = FontUtil.getFont(getContext(), fontFamily);
            fontCache.put(fontFamily, typeface);
            return typeface;
        }
    }
}
