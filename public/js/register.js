document.getElementById("formRegister").addEventListener("submit", (e) => {
    e.preventDefault();

    const formElem = document.getElementById("formRegister");

    fetch("/api/v1/signup", {
        method: "POST",
        body: new FormData(formElem),
    })
        .then((res) => {
            window.location.href = "/";
        })
        .catch((err) => alert(err.response.data.message));
});
