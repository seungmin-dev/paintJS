const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "";
const INTIAL_SIZE = 700;

canvas.width = INTIAL_SIZE;
canvas.height = INTIAL_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, INTIAL_SIZE, INTIAL_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
	painting = false;
}

function startPainting() {
	painting = true;
}

function onMouseMove(event) {
	const x = event.offsetX;
	const y = event.offsetY;
	if(!painting) {
		ctx.beginPath();
		ctx.moveTo(x, y);
	} else {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

function onMouseDown(event) {
	painting = true;
}

function handlerColorClick(event){
	const color = event.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

function handlerRangeChange(event){
	const size = event.target.value;
	ctx.lineWidth = size;
}

function handlerChageMode() {
	if(filling === true) {
		filling = false;
		mode.innerText = "Fill"
	} else {
		filling = true;
		mode.innerText = "Paint";
	}
}

function handlerCanvasClick() {
	if(filling) {
		ctx.fillRect(0, 0, INTIAL_SIZE, INTIAL_SIZE);
	}

}

function handlerContextMenu(event) {
	event.preventDefault();
}

function handlerSave() {
	const image = canvas.toDataURL();
	const link = document.createElement("a");
	link.href = image;
	link.download = "paintJS";
	link.click();
}

if (canvas) {
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting);
	canvas.addEventListener("click", handlerCanvasClick);
	canvas.addEventListener("contextmenu", handlerContextMenu);
}

// console.log(Array.from(colors));
Array.from(colors).forEach(color => color.addEventListener("click", handlerColorClick));

if(range) {
	range.addEventListener("input", handlerRangeChange);
}

if(mode) {
	mode.addEventListener("click", handlerChageMode);
}

if(saveBtn) {
	saveBtn.addEventListener("click", handlerSave);
}
