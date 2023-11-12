const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const description = document.getElementById("description");
const delivery = document.getElementById("delivery");
const billing = document.getElementById("billing");

// get user data
const userProfileData = {
  firtname: firstName.value,
  lastname: lastName.value,
  description: description.value,
  delivery: delivery.value,
  billing: billing.value,
};

updateUserInformation(userProfileData);
// check profile data in the local storage
let data = JSON.parse(window.localStorage.getItem("user"));
(function updateProfileDataWithLocalStorage() {
  if (data) {
    firstName.value = data.firstname;
    lastName.value = data.lastname;
    description.value = data.description;
    delivery.value = data.delivery;
    billing.value = data.billing;
  } else {
    window.localStorage.setItem("profileData", JSON.stringify(data));
  }
})();

firstName.addEventListener("change", (e) => {
  const value = e.target.value;
  window.localStorage.setItem(
    "user",
    JSON.stringify({ ...data, firstName: value })
  );
  updateUserInformation(JSON.parse(window.localStorage.getItem("user")));
});
lastName.addEventListener("change", (e) => {
  const value = e.target.value;
  window.localStorage.setItem(
    "user",
    JSON.stringify({ ...data, lastName: value })
  );
  updateUserInformation(JSON.parse(window.localStorage.getItem("user")));
});
description.addEventListener("change", (e) => {
  const value = e.target.value;
  window.localStorage.setItem(
    "user",
    JSON.stringify({ ...data, description: value })
  );
  updateUserInformation(JSON.parse(window.localStorage.getItem("user")));
});

billing.addEventListener("change", (e) => {
  const value = e.target.value;
  window.localStorage.setItem(
    "user",
    JSON.stringify({ ...data, billing: value })
  );
  updateUserInformation(JSON.parse(window.localStorage.getItem("user")));
});

async function updateUserInformation(data) {
  const user_id = window.localStorage.getItem("user_id");
  console.log(user_id);
  if (user_id) {
    const res = await fetch(`http://127.0.0.1:5000/api/user/${user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
}
