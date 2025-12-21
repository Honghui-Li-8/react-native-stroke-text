package com.stroketext;

import android.graphics.Typeface;
import android.text.Layout;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.text.TextUtils;
import android.util.TypedValue;

import com.facebook.react.uimanager.DisplayMetricsHolder;
import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.PixelUtil;

import java.util.HashMap;
import java.util.Map;

public class StrokeTextViewShadowNode extends LayoutShadowNode {
    private String text = "";
    private float fontSize = 14;
    private int textColor = 0xFF000000;
    private int strokeColor = 0xFFFFFFFF;
    private float strokeWidth = 1;
    private String fontFamily = "sans-serif";
    private int numberOfLines = 0;
    private boolean ellipsis = false;
    private float customWidth = 0;
    private Layout.Alignment alignment = Layout.Alignment.ALIGN_CENTER;
    private final Map<String, Typeface> fontCache = new HashMap<>();
    private final TextPaint textPaint = new TextPaint(TextPaint.ANTI_ALIAS_FLAG);

    public void onBeforeLayout() {
        // Calculate layout dimensions
        Typeface typeface = getFont(fontFamily);
        textPaint.setTypeface(typeface);
        textPaint.setTextSize(getScaledSize(fontSize));
        textPaint.setColor(textColor);

        int width = (int) getCanvasWidth();
        CharSequence ellipsizedText = ellipsis ? TextUtils.ellipsize(text, textPaint, width, TextUtils.TruncateAt.END) : text;
        StaticLayout textLayout = new StaticLayout(ellipsizedText, textPaint, width, alignment, 1.0f, 0.0f, false);
        
        if (numberOfLines > 0 && numberOfLines < textLayout.getLineCount()) {
            int lineEnd = textLayout.getLineEnd(numberOfLines - 1);
            ellipsizedText = ellipsizedText.subSequence(0, lineEnd);
            textLayout = new StaticLayout(ellipsizedText, textPaint, width, alignment, 1.0f, 0.0f, false);
        }

        // Set layout dimensions
        int layoutWidth = textLayout.getWidth();
        int layoutHeight = textLayout.getHeight();
        
        // Add stroke width to dimensions
        float scaledStrokeWidth = getScaledSize(strokeWidth);
        layoutWidth += (int) scaledStrokeWidth;
        layoutHeight += (int) scaledStrokeWidth;

        setStyleWidth(PixelUtil.toDIPFromPixel(layoutWidth));
        setStyleHeight(PixelUtil.toDIPFromPixel(layoutHeight));
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

    private float getScaledSize(float size) {
        return TypedValue.applyDimension(
            TypedValue.COMPLEX_UNIT_SP,
            size,
            DisplayMetricsHolder.getWindowDisplayMetrics()
        );
    }

    private Typeface getFont(String fontFamily) {
        if (fontCache.containsKey(fontFamily)) {
            return fontCache.get(fontFamily);
        } else {
            Typeface typeface = FontUtil.getFont(
                getThemedContext(),
                fontFamily
            );
            fontCache.put(fontFamily, typeface);
            return typeface;
        }
    }

    // Props setters - these will be called by codegen-generated code
    public void setText(String text) {
        if (!this.text.equals(text)) {
            this.text = text;
            markUpdated();
        }
    }

    public void setFontSize(double fontSize) {
        float scaledFontSize = getScaledSize((float) fontSize);
        if (this.fontSize != scaledFontSize) {
            this.fontSize = scaledFontSize;
            markUpdated();
        }
    }

    public void setColor(String color) {
        int parsedColor = parseColor(color);
        if (this.textColor != parsedColor) {
            this.textColor = parsedColor;
            markUpdated();
        }
    }

    public void setStrokeColor(String color) {
        int parsedColor = parseColor(color);
        if (this.strokeColor != parsedColor) {
            this.strokeColor = parsedColor;
            markUpdated();
        }
    }

    public void setStrokeWidth(double strokeWidth) {
        float scaledStrokeWidth = getScaledSize((float) strokeWidth);
        if (this.strokeWidth != scaledStrokeWidth) {
            this.strokeWidth = scaledStrokeWidth;
            markUpdated();
        }
    }

    public void setFontFamily(String fontFamily) {
        if (!this.fontFamily.equals(fontFamily)) {
            this.fontFamily = fontFamily;
            markUpdated();
        }
    }

    public void setAlign(String align) {
        Layout.Alignment newAlignment;
        if ("left".equals(align)) {
            newAlignment = Layout.Alignment.ALIGN_NORMAL;
        } else if ("right".equals(align)) {
            newAlignment = Layout.Alignment.ALIGN_OPPOSITE;
        } else {
            newAlignment = Layout.Alignment.ALIGN_CENTER;
        }
        if (this.alignment != newAlignment) {
            this.alignment = newAlignment;
            markUpdated();
        }
    }

    public void setNumberOfLines(int numberOfLines) {
        if (this.numberOfLines != numberOfLines) {
            this.numberOfLines = numberOfLines;
            markUpdated();
        }
    }

    public void setEllipsis(boolean ellipsis) {
        if (this.ellipsis != ellipsis) {
            this.ellipsis = ellipsis;
            markUpdated();
        }
    }

    public void setWidth(double width) {
        if (this.customWidth != width) {
            this.customWidth = (float) width;
            markUpdated();
        }
    }

    private int parseColor(String color) {
        if (color == null || color.isEmpty()) {
            return 0xFF000000;
        }
        if (color.startsWith("#")) {
            return android.graphics.Color.parseColor(color);
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
        return android.graphics.Color.argb(a, r, g, b);
    }
}

