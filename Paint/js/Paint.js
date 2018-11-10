var canvas = {};
canvas.color = ["red", "yellow", "blue", "green", "black", "purple", "gray", "orange", "pink", "white"];
canvas.selectedColor = "black";
canvas.size = ["3", "6", "9", "12", "15", "18", "21", "24"];
canvas.selectedSize = "3px";
canvas.shape = ["Circle", "Square"];
canvas.selectedShape = "50%";

canvas.start = function () {
    canvas.generateDynamicColor();
    canvas.generateDynamicSize();
    canvas.generateDynamicShape();
    canvas.bindDrawingActions();
}

var newDiv;
var canvasDraw = document.getElementById("canvas");
canvas.draw = function (e) {
    newDiv = document.createElement("div");
    canvasDraw.appendChild(newDiv);
    newDiv.className = "newDiv";
    newDiv.style.backgroundColor = canvas.selectedColor;
    newDiv.style.width = canvas.selectedSize;
    newDiv.style.height = canvas.selectedSize;
    newDiv.style.borderRadius = canvas.selectedShape;
    newDiv.style.position = "absolute";
    newDiv.style.top = e.pageY - this.offsetTop + "px";
    newDiv.style.left = e.pageX - this.offsetLeft + "px";
}
canvas.bindDrawingActions = function () {
    canvasDraw.addEventListener("mousedown", function () {
        canvasDraw.addEventListener("mousemove", canvas.draw)
    });
    canvasDraw.addEventListener("click", function () {
        canvasDraw.addEventListener("click", canvas.draw)
    });
    document.addEventListener("click", function () {
        canvasDraw.removeEventListener("mousemove", canvas.draw)
    })
}

canvas.generateDynamicColor = function () {
    var colorButton = document.getElementById("color-menu");
    for (var i = 0; i < canvas.color.length; i++) {
        var buttonItem = document.createElement("li");
        var newButton = document.createElement("button");
        newButton.style.backgroundColor = canvas.color[i];
        newButton.className = "colorButton";
        newButton.id = canvas.color[i];
        buttonItem.appendChild(newButton);
        colorButton.appendChild(buttonItem);
        newButton.addEventListener("click", function () {
            var clickColor = this;
            canvas.selectedColor = clickColor.id;
            var allColorButton = document.getElementsByClassName("colorButton");
            for (var j = 0; j < allColorButton.length; j++) {
                allColorButton[j].classList.remove("selected")
            }
            clickColor.classList.add("selected")
        })
    }
}
canvas.generateDynamicSize = function () {
    var sizeButton = document.getElementById("size-menu");
    var buttonItem = document.createElement("select");
    for (var i = 0; i < canvas.size.length; i++) {
        var newButton = document.createElement("option");
        var buttonLabel = document.createTextNode(`${canvas.size[i]}px`);
        newButton.className = "sizeButton";
        newButton.id = canvas.size[i];
        buttonItem.appendChild(newButton);
        sizeButton.appendChild(buttonItem);
        newButton.appendChild(buttonLabel);
        buttonItem.addEventListener("change", function (e) {
            canvas.selectedSize = e.target.value;
        })
    }
}
canvas.generateDynamicShape = function () {
    var shapeButton = document.getElementById("shape-menu");
    var buttonItem = document.createElement("select");
    for (var i = 0; i < canvas.shape.length; i++) {
        var newButton = document.createElement("option");
        var buttonLabel = document.createTextNode(canvas.shape[i]);
        newButton.className = "shapeButton";
        newButton.id = canvas.shape[i];
        buttonItem.appendChild(newButton);
        shapeButton.appendChild(buttonItem);
        newButton.appendChild(buttonLabel);
        buttonItem.addEventListener("change", function (e) {
            if (e.target.value == "Circle") {
                canvas.selectedShape = "50%";
            }
            else if (e.target.value == "Square") {
                canvas.selectedShape = "0";
            }
        })
    }
}
canvas.new = function () {
    var allNewDiv = canvasDraw.getElementsByClassName("newDiv");
    while (allNewDiv.length > 0){
        canvasDraw.removeChild(allNewDiv[0]);
    }
}
canvas.save = function () {
    var canvasLeft = canvasDraw.getBoundingClientRect().left;
    var canvasTop = canvasDraw.getBoundingClientRect().top;
    var canvasObj = {};
    canvasObj["name"] = prompt("Please enter a name for this file");
    canvasObj["newDiv"] = [];
    var allNewDiv = canvasDraw.getElementsByClassName("newDiv");
    for (var i = 0; i < allNewDiv.length; i++) {
        var currentNewDiv = allNewDiv[i];
        var newDivObj = {};
        newDivObj["size"] = currentNewDiv.style.height;
        newDivObj["color"] = currentNewDiv.style.backgroundColor;
        newDivObj["top"] = currentNewDiv.getBoundingClientRect().top - canvasTop;
        newDivObj["left"] = currentNewDiv.getBoundingClientRect().left - canvasLeft;
        canvasObj["newDiv"].push(newDivObj);
    }
    localStorage.setItem("paintingName", JSON.stringify(canvasObj));
    alert("Your painting have been saved");
};

var newBtn = document.getElementById("new");
newBtn.addEventListener("click", canvas.new);
var saveBtn = document.getElementById("save");
saveBtn.addEventListener("click", canvas.save);
var loadBtn = document.getElementById("load");
loadBtn.addEventListener("click", canvas.load);

canvas.start();
