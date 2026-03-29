document.addEventListener("DOMContentLoaded", () => {
    const filters = {
        brightness: { value: 100, min: 0, max: 200, unit: "%" },
        contrast: { value: 100, min: 0, max: 200, unit: "%" },
        saturate: { value: 100, min: 0, max: 200, unit: "%" },
        "hue-rotate": { value: 0, min: 0, max: 360, unit: "deg" },
        blur: { value: 0, min: 0, max: 10, unit: "px" },
        grayscale: { value: 0, min: 0, max: 100, unit: "%" },
        sepia: { value: 0, min: 0, max: 100, unit: "%" },
        opacity: { value: 100, min: 0, max: 100, unit: "%" },
        invert: { value: 0, min: 0, max: 100, unit: "%" }
    };

    const defaultFilters = JSON.parse(JSON.stringify(filters));

    const presets = {
        drama: { brightness: 80, contrast: 150, saturate: 120 },
        vintage: { brightness: 110, contrast: 90, saturate: 80, sepia: 40 },
        oldSchool: { brightness: 100, contrast: 110, saturate: 60, "hue-rotate": 20, grayscale: 30, sepia: 50 },
        cyberpunk: { brightness: 120, contrast: 180, saturate: 150, "hue-rotate": 120 },
        softGlow: { brightness: 130, contrast: 70, saturate: 130, blur: 2, sepia: 10 },
        noir: { brightness: 70, contrast: 180, saturate: 0, grayscale: 100 },
        warmSunset: { brightness: 110, contrast: 110, saturate: 140, "hue-rotate": 15, sepia: 30 },
        coolTone: { brightness: 100, contrast: 120, saturate: 110, "hue-rotate": 200 },
        faded: { brightness: 120, contrast: 80, saturate: 60, grayscale: 20, sepia: 20, opacity: 80 },
        retroPop: { brightness: 110, contrast: 150, saturate: 160, "hue-rotate": 340 }
    };

    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    const fileInput = document.querySelector("#image-input");
    const filtersContainer = document.querySelector(".filters");
    const resetBtn = document.querySelector(".reset");
    const downloadBtn = document.querySelector(".download");
    const previewWrapper = document.querySelector(".preview-wrapper");
    const presetButtons = document.querySelectorAll(".preset-buttons button");

    const sliderInputs = {};
    const image = new Image();
    let imageLoaded = false;

    let currentObjectURL = null;


    Object.entries(filters).forEach(([name, config]) => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("filter");

        const label = document.createElement("label");
        label.textContent = name.replace("-", " ");

        const input = document.createElement("input");
        input.type = "range";
        input.min = config.min;
        input.max = config.max;
        input.value = config.value;

        sliderInputs[name] = input;

        input.addEventListener("input", () => {
            filters[name].value = Number(input.value);
            applyFilters();
        });

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        filtersContainer.appendChild(wrapper);
    });

    // Apply filters function
    function applyFilters() {
        if (!imageLoaded) return;


        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        // Build filter string
        const filterString = Object.entries(filters)
            .map(([name, config]) => `${name}(${config.value}${config.unit})`)
            .join(" ");


        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.filter = filterString;
        ctx.drawImage(image, 0, 0);

     
        ctx.filter = "none";
    }

    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;


        if (currentObjectURL) {
            URL.revokeObjectURL(currentObjectURL);
        }

        currentObjectURL = URL.createObjectURL(file);

        image.onload = () => {
            imageLoaded = true;
            canvas.style.display = "block";
            previewWrapper.classList.add("hidden");
            applyFilters();
            
        };

        image.src = currentObjectURL;
    });

   
    resetBtn.addEventListener("click", () => {
        Object.entries(filters).forEach(([name, config]) => {
            config.value = defaultFilters[name].value;
            sliderInputs[name].value = config.value;
        });
        applyFilters();
    });


    downloadBtn.addEventListener("click", () => {
        if (!imageLoaded) {
            alert("Load an image first");
            return;
        }

      
        try {
            const link = document.createElement("a");
            link.download = "edited-image.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        } catch (e) {
            alert("Could not export the image. Try reloading it.");
            console.error("Download failed:", e);
        }
    });

    
    presetButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const preset = presets[btn.textContent.trim()];
            if (!preset) return;

            Object.entries(filters).forEach(([name, config]) => {
                config.value = defaultFilters[name].value;
            });

            
            Object.entries(preset).forEach(([key, value]) => {
                if (filters[key]) filters[key].value = value;
            });

            Object.entries(sliderInputs).forEach(([key, input]) => {
                input.value = filters[key].value;
            });

            applyFilters();
        });
    });


});
