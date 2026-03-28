document.addEventListener("DOMContentLoaded", () => {

const filters = {
    brightness: { value: 100, min: 0, max: 200, unit: '%' },
    contrast: { value: 100, min: 0, max: 200, unit: '%' },
    saturate: { value: 100, min: 0, max: 200, unit: '%' },
    "hue-rotate": { value: 0, min: 0, max: 360, unit: 'deg' },
    blur: { value: 0, min: 0, max: 10, unit: 'px' },
    grayscale: { value: 0, min: 0, max: 100, unit: '%' },
    sepia: { value: 0, min: 0, max: 100, unit: '%' },
    opacity: { value: 100, min: 0, max: 100, unit: '%' },
    invert: { value: 0, min: 0, max: 100, unit: '%' }
};

const presets = {
    drama: {
        brightness: 80,
        contrast: 150,
        saturate: 120,
        "hue-rotate": 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    vintage: {
        brightness: 110,
        contrast: 90,
        saturate: 80,
        "hue-rotate": 0,
        blur: 0,
        grayscale: 0,
        sepia: 40,
        opacity: 100,
        invert: 0
    },
    oldSchool: {
        brightness: 100,
        contrast: 110,
        saturate: 60,
        "hue-rotate": 20,
        blur: 0,
        grayscale: 30,
        sepia: 50,
        opacity: 100,
        invert: 0
    },
    cyberpunk: {
        brightness: 120,
        contrast: 180,
        saturate: 150,
        "hue-rotate": 120,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    softGlow: {
        brightness: 130,
        contrast: 70,
        saturate: 130,
        "hue-rotate": 0,
        blur: 2,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },
    noir: {
        brightness: 70,
        contrast: 180,
        saturate: 0,
        "hue-rotate": 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    warmSunset: {
        brightness: 110,
        contrast: 110,
        saturate: 140,
        "hue-rotate": 15,
        blur: 0,
        grayscale: 0,
        sepia: 30,
        opacity: 100,
        invert: 0
    },
    coolTone: {
        brightness: 100,
        contrast: 120,
        saturate: 110,
        "hue-rotate": 200,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    faded: {
        brightness: 120,
        contrast: 80,
        saturate: 60,
        "hue-rotate": 0,
        blur: 0,
        grayscale: 20,
        sepia: 20,
        opacity: 80,
        invert: 0
    },
    retroPop: {
        brightness: 110,
        contrast: 150,
        saturate: 160,
        "hue-rotate": 340,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    }
};

const imgElement = document.querySelector("#canvas");
const imgInput = document.querySelector("#image-input");
const container = document.querySelector(".filters");
const resetBtn = document.querySelector(".reset");
const downloadBtn = document.querySelector(".download");
const previewWrapper = document.querySelector(".preview-wrapper");

Object.keys(filters).forEach((filter) => {
    const el = createFilterElement(filter, filters[filter]);
    container.appendChild(el);
});

function createFilterElement(name, config) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("filter");

    const label = document.createElement("label");
    label.textContent = name.replace("-", " ");

    const input = document.createElement("input");
    input.type = "range";
    input.min = config.min;
    input.max = config.max;
    input.value = config.value;
    input.dataset.filter = name;

    input.addEventListener("input", () => {
        filters[name].value = input.value;
        console.log(`Slider changed: ${name} = ${input.value}`);
        applyFilters();
    });

    wrapper.appendChild(label);
    wrapper.appendChild(input);

    return wrapper;
}

imgInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
        imgElement.src = e.target.result;
        imgElement.style.display = "block";
        previewWrapper.classList.add("hidden");
        
        console.log("Image loaded successfully");
        applyFilters();
    };
    
    reader.readAsDataURL(file);
});
    
function applyFilters() {
    if (!imgElement.src) {
        console.log("No image loaded");
        return;
    }
    
    console.log("Applying filters");
    
    let filterString = "";

    for (let key in filters) {
        const f = filters[key];
        const value = parseFloat(f.value);
        
        console.log(`${key}: ${value}`);
        
        switch(key) {
            case "brightness":
            case "contrast":
            case "saturate":
                
                filterString += `${key}(${value}%) `;
                break;
            case "grayscale":
            case "sepia":
            case "invert":
      
                filterString += `${key}(${value}%) `;
                break;
            case "opacity":
             
                filterString += `${key}(${value / 100}) `;
                break;
            case "hue-rotate":
           
                filterString += `${key}(${value}deg) `;
                break;
            case "blur":
              
                filterString += `${key}(${value}px) `;
                break;
            default:
                filterString += `${key}(${value}${f.unit}) `;
        }
    }

    const finalFilterString = filterString.trim();
    console.log("Final filter string:", finalFilterString);
    
  
    imgElement.style.filter = finalFilterString;
    console.log("Filters applied to image");
}

resetBtn.addEventListener("click", () => {
    for (let key in filters) {
        filters[key].value =
            key === "brightness" ||
            key === "contrast" ||
            key === "saturate" ||
            key === "opacity"
                ? 100
                : 0;
    }

    
    document.querySelectorAll("input[type='range']").forEach((input) => {
        const type = input.dataset.filter;
        input.value = filters[type].value;
    });

    applyFilters();
});


downloadBtn.addEventListener("click", () => {
    if (!imgElement.src) {
        alert("Please load an image first");
        return;
    }
    
    
    const canvas = document.createElement("canvas");
    const img = new Image();
    
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext("2d");
        
        
        ctx.filter = imgElement.style.filter;
        ctx.drawImage(img, 0, 0);
        
        
        const link = document.createElement("a");
        link.download = "edited-image.png";
        link.href = canvas.toDataURL();
        link.click();
    };
    
    img.src = imgElement.src;
});


const presetButtons = document.querySelectorAll(".preset-buttons button");

presetButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const presetName = button.textContent;
        applyPreset(presetName);
    });
});

function applyPreset(presetName) {
    if (!presets[presetName]) {
        console.log("Preset not found:", presetName);
        return;
    }
    
    const preset = presets[presetName];
    
    
    for (let key in preset) {
        if (filters[key]) {
            filters[key].value = preset[key];
        }
    }
    
    
    document.querySelectorAll("input[type='range']").forEach((input) => {
        const type = input.dataset.filter;
        if (filters[type]) {
            input.value = filters[type].value;
        }
    });
    
    console.log("Preset applied:", presetName);
    applyFilters();
}

}); 
