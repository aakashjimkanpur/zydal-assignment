const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.font = "12px Arial";
ctx.fillStyle = "red";
ctx.textAlign = "left";
ctx.textBaseline = "middle";
ctx.fillText("B", canvas.width / 2, canvas.height / 2);

function downloadCanvas() {
  const dataURL = canvas.toDataURL("image/png");
  const data = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  const fileData = hexEncode(data);
  const fileName = "canvas_data.txt";
  const file = new Blob([fileData], { type: "text/plain" });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, fileName);
  } else {
    const a = document.createElement("a");
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

function hexEncode(str) {
  let hex, i;
  let result = "";
  for (i = 0; i < str.length; i++) {
    hex = str.charCodeAt(i).toString(16);
    result += ("000" + hex).slice(-4);
  }
  return result;
}
