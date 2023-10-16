const message = document.querySelector("#message");
const button = document.getElementById("button");
const wish = document.getElementById("wish");
const souhait = document.getElementById("souhait");

const onSubmit = (e) => {
    e.preventDefault();
    message.style.display = "none";
    souhait.innerText = `Le souhait est ${wish.value}`;
};

message.addEventListener("submit", onSubmit);

