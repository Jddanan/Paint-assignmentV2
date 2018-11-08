var canvas = {};
canvas.color = ["red", "yellow", "blue", "green", "black", "purple", "white"];
canvas.selectedColor = "black";
canvas.size = ["small", "medium", "large"];
canvas.selectedSize = "medium";

canvas.start = function () {
    canvas.generateDynamicColor();
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
    newDiv.style.backgroundColor = colorToDraw;
    newDiv.style.width = "4px";
    newDiv.style.height = "4px";
    newDiv.style.borderRadius = "50%";
    newDiv.style.position = "absolute";
    newDiv.style.top = e.pageY - this.offsetTop + "px";
    newDiv.style.left = e.pageX - this.offsetLeft + "px";
}
canvasDraw.addEventListener("mousedown", function () {
    canvasDraw.addEventListener("mousemove", canvas.draw)
});
document.addEventListener("click", function () {
    canvasDraw.removeEventListener("mousemove", canvas.draw)
})
var colorToDraw = "black"
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
            colorToDraw = clickColor.id;
            var allColorButton = document.getElementsByClassName("colorButton");
            for (var j = 0; j < allColorButton.length; j++) {
                allColorButton[j].classList.remove("selected")
            }
            clickColor.classList.add("selected")
        })
    }
}
canvas.start();
