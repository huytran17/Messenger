$(document).on("click", "#btnLogin", async function () {
  await axios
    .post("", {
      email: $("#email").val(),
      password: $("#password").val(),
    })
    .then((res) => {
      console.log(res.error);
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      console.log("always");
    });
});
