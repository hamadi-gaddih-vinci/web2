const colors = document.querySelectorAll(".color-div");

colors.forEach((e) => {
    e.addEventListener("click", () => {
        e.innerText = e.style.backgroundColor;
        e.style.width = "100px";
        e.style.height = "100px";
    })
})
