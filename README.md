# Canvas Image Editor 🎨

A simple image editor built using JavaScript and the HTML Canvas API. This project allows users to upload an image, apply real-time filters, and download the edited version.

## 🚀 Features

* Upload image from local device
* Real-time filter adjustments:

  * Brightness
  * Contrast
  * Saturation
  * Hue Rotation
  * Blur
  * Grayscale
  * Sepia
  * Opacity
  * Invert
* Dynamic filter UI generation using JavaScript
* Reset filters functionality
* Download edited image
* Responsive UI

## 🧠 Learnings

* Working with the Canvas API for image rendering
* Applying CSS-like filters using `canvasCtx.filter`
* Understanding how rendering works (clear → redraw cycle)
* Building dynamic UI using JavaScript (no hardcoded HTML)
* Managing state using an object-based architecture
* Debugging real-world UI + rendering issues

## 🛠️ Tech Stack

* HTML
* CSS
* JavaScript (Vanilla)
* Canvas API

## 📸 How It Works

1. User uploads an image
2. Image is drawn on canvas
3. Filters are applied dynamically using slider inputs
4. Canvas redraws image in real time
5. User can download the final edited image

## 📂 Project Structure

```
index.html
style.css
script.js
```




