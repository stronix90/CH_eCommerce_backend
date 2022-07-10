document.getElementById("formRegister").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = document.getElementById("formRegister");

    axios
        .post(
            "/api/v1/signup",
            {
                email: form[0].value,
                password: form[1].value,
                name: form[2].value,
                address: form[3].value,
                birthDate: form[4].value,
                phone: form[5].value,
                file: form[6].value,
            },
            {
                withCredentials: true,
            }
        )
        .then((res) => {
            window.location.href = "/";
        })
        .catch((err) => alert(err.response.data.error));
});
