const text = "sample text";
const btn = document.querySelector("#btn");

function writeText() {
  if (document.querySelector('#container')){
    return
  }
  const container = document.createElement("div");
  container.setAttribute("id", "container");
  document.body.appendChild(container);
  let index = 0;
  setInterval(() => {
    if (index < text.length) {
      container.append(text[index]);
      index++;
    } else {
      setInterval(() => {
        container.remove();
      }, 1000);
      return;
    }
  }, 100);
}

btn.addEventListener("click", writeText);
