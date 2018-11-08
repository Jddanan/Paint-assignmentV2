var canvas = {};
canvas.color = ["red", "yellow", "blue", "green", "black", "purple", "white"];
canvas.selectedColor = "black";
canvas.size = ["x-Small", "Small", "Medium", "Large", "x-Large"];
canvas.selectedSize = "3px";

canvas.start = function () {
    canvas.generateDynamicColor();
    canvas.generateDynamicSize();
}


var newBtn = document.getElementById("new");
newBtn.addEventListener("click", canvas.new);
var saveBtn = document.getElementById("save");
saveBtn.addEventListener("click", canvas.save);
var loadBtn = document.getElementById("load");
loadBtn.addEventListener("click", canvas.load);

var newDiv;
var canvasDraw = document.getElementById("canvas");
canvas.draw = function (e) {
    newDiv = document.createElement("div");
    canvasDraw.appendChild(newDiv);
    newDiv.style.backgroundColor = canvas.selectedColor;
    newDiv.style.width = canvas.selectedSize;
    newDiv.style.height = canvas.selectedSize;
    newDiv.style.borderRadius = "50%";
    newDiv.style.position = "absolute";
    newDiv.style.top = e.pageY - this.offsetTop + "px";
    newDiv.style.left = e.pageX - this.offsetLeft + "px";
}
canvasDraw.addEventListener("mousedown", function () {
    canvasDraw.addEventListener("mousemove", canvas.draw)
});
canvasDraw.addEventListener("click", function () {
    canvasDraw.addEventListener("click", canvas.draw)
});
document.addEventListener("click", function () {
    canvasDraw.removeEventListener("mousemove", canvas.draw)
})
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
        var buttonLabel = document.createTextNode(canvas.size[i]);
        newButton.className = "sizeButton";
        newButton.id = canvas.size[i];
        buttonItem.appendChild(newButton);
        sizeButton.appendChild(buttonItem);
        newButton.appendChild(buttonLabel);
        buttonItem.addEventListener("change", function (e) {
            if (e.target.value == "x-Small") {
                canvas.selectedSize = "3px";
            }

            else if (e.target.value == "Small") {
                canvas.selectedSize = "5px";

            }
            else if (e.target.value == "Medium") {
                canvas.selectedSize = "8px";
            }
            else if (e.target.value == "Large") {
                canvas.selectedSize = "14px";
            }
            else if (e.target.value == "x-Large") {
                canvas.selectedSize = "20px";
            }
        })
    }
}
canvas.start();
