Papa.parse("https://colorcombinations.github.io/colors.csv", {
    download: true,
    complete: function(result) {
    
    let dataByKey = {};

    for (let dataPoint of result.data) {
        let combinationNumber = dataPoint[0];
        let colorCode = dataPoint[1];
        let colorPercentage = dataPoint[2];

        if (dataByKey[combinationNumber] === undefined) {
            dataByKey[combinationNumber] = {};
        }
        if (dataByKey[combinationNumber][colorCode] === undefined) {
            dataByKey[combinationNumber][colorCode] = {};
        }
        dataByKey[combinationNumber][colorCode] = colorPercentage;
    }

    console.log(dataByKey);

    //Here is everything
    document.getElementById("code").style.display = "flex";
    document.getElementById("code").style.position = "relative";
    document.getElementById("code").style.width = "80%";
    document.getElementById("code").style.marginRight = "auto";
    document.getElementById("code").style.marginLeft = "auto";
    document.getElementById("code").style.marginTop = "55px";

    //Here is the image gallery
    let colorGallery = document.createElement("div");
    colorGallery.style.width = "55%";
    colorGallery.style.display = "flex";
    colorGallery.style.flexWrap = "wrap";
    colorGallery.style.marginRight = "auto";
    colorGallery.style.marginLeft = "auto";
    colorGallery.style.position = "relative";
    colorGallery.style.justifyContent = "space-around";
    colorGallery.style.alignItems = "center";

        for (let combinationNumber of Object.keys(dataByKey)){
            let combinationContainer = document.createElement("div");
            combinationContainer.style.width = "70px";
            combinationContainer.style.height = "85px";
            combinationContainer.style.margin = "20px";
            combinationContainer.style.display = "inline-block";
            combinationContainer.style.position = "relative";
            combinationContainer.style.cursor = "pointer";

            let infoPhoto = document.createElement("img");
            infoPhoto.style.display = "block";
            infoPhoto.src = combinationNumber + ".jpg";
            infoPhoto.style.width = "150px";
            infoPhoto.style.height = "auto";
            infoPhoto.style.marginTop = "10px";
                
            //Here is the information container
            let informationContainer = document.createElement("div");
            informationContainer.style.display = "block";
            informationContainer.style.position = "absolute";
            informationContainer.style.width = "150px";
            informationContainer.style.height = "260px";
            informationContainer.style.margin = "20px";
            informationContainer.style.display = "none";
            document.getElementById("code").append(informationContainer);

            informationContainer.append(infoPhoto);

            for (let colorCode of Object.keys(dataByKey[combinationNumber])){
                let colorContainer = document.createElement("div");
                colorContainer.style.backgroundColor = colorCode;

                //Information container continues...
                let informationColorContainer = document.createElement("div");
                informationContainer.append(informationColorContainer);

                let informationContainerInfo = document.createElement("h2");
                informationContainerInfo.style.position = "absolute";
                informationContainerInfo.style.display = "block";
                informationContainerInfo.style.color = "white";
                informationColorContainer.append(informationContainerInfo);

                informationColorContainer.style.backgroundColor = colorCode;   

                //on click
                combinationContainer.onclick = function() {
                    if (informationContainer.style.display === "none") {
                        informationContainer.style.display = "block";
                        combinationContainer.style.outline = "3px dotted black";
                    }
                    else {
                        informationContainer.style.display = "none";
                        combinationContainer.style.outline = "";
                    }
                }
                
                //Percentage forloop
                for (let colorPercentage of Object.keys(dataByKey[combinationNumber][colorCode])){
                    colorContainer.style.height = (dataByKey[combinationNumber][colorCode]) + "%";
                    informationColorContainer.style.height = (dataByKey[combinationNumber][colorCode]) + "%"
                    informationContainerInfo.innerHTML = colorCode + " (" + dataByKey[combinationNumber][colorCode] + "%)";
                }

                 //on hover
                 combinationContainer.onmouseover = function() {
                     combinationContainer.style.outline = "3px dotted black"
                    };
                 combinationContainer.onmouseleave = function() {
                     if (informationContainer.style.display === "block") {
                         combinationContainer.style.outline = "3px dotted black";}
                    else {combinationContainer.style.outline = ""};
                     }
            
            combinationContainer.append(colorContainer);
            colorGallery.append(combinationContainer);
            
            }
        }
    document.getElementById("code").append(colorGallery);
    
    }
})