const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.font = "20px Arial";
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.fillText("A", canvas.width / 2, canvas.height / 2);

function RGBAToHexA(r, g, b, a) {
  r = r.toString(16).padStart(2, "0");
  g = g.toString(16).padStart(2, "0");
  b = b.toString(16).padStart(2, "0");
  a = a.toString(16).padStart(2, "0");
  return "0x" + r + g + b + a;
}

function downloadCanvas() {
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let hex = "";
  for (let i = 0; i < data.length; i = i + 4) {
    if (i % 64 == 0) hex += "\n";
    hex += RGBAToHexA(data[i], data[i + 1], data[i + 2], data[i + 3]) + ", ";
  }
  const file = new Blob([hex], { type: "text/plain" });
  document.getElementById("dcanvas").href = URL.createObjectURL(file);
}
