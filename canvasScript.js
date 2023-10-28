const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.font = "20px Arial";
ctx.fillStyle = "red";
ctx.textAlign = "center";
ctx.fillText("A", canvas.width / 2, canvas.height / 2);

function RGBAToHexA(r, g, b, a) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length === 1) r = "00" + r;
  if (g.length === 1) g = "00" + g;
  if (b.length === 1) b = "00" + b;
  if (r.length === 2) r = "0" + r;
  if (g.length === 2) g = "0" + g;
  if (b.length === 2) b = "0" + b;
  return "0x" + r + g + b;
}
function downloadCanvas() {
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let hex = "";
  for (let i = 0; i < data.length; i = i + 4) {
    if (i % 64 == 0) hex += "\n";
    hex += RGBAToHexA(data[i], data[i] + 1, data[i] + 2, data[i] + 3) + ", ";
  }
  const fileName = "canvas_data.txt";
  const file = new Blob([hex], { type: "text/plain" });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, fileName);
  } else {
    document.getElementById("dcanvas").href = URL.createObjectURL(file);
  }
}
