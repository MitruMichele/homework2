const editimg = document.querySelector(".editimg");
const gallery = document.querySelector(".gallery");
const input = document.getElementById("input");
const uploadBtn = document.querySelector(".save");
const productinfo = document.querySelector(".productinfo");
const infoBtn = document.getElementById("infoBtn");

editimg.addEventListener("click", () => {
  input.style.visibility = "visible";
});

let files;
input.addEventListener("change", (e) => {
  input.style.visibility = "hidden";
  files = Array.from(e.target.files || []);
  displayImages();
});

function displayImages() {
  let images = "";
  files.forEach((image, index) => {
    images += `<div class="image">
                <img src="${URL.createObjectURL(
                  image
                )}" alt="image" class="images">
                <span onclick="deleteImage(${index})">&times;</span>
              </div>`;
  });
  gallery.innerHTML = images;
}

function uploadMultipleFiles() {
  let formData = new FormData();
  formData.append("productinfo", productinfo.value);
  for (let i = 0; i < files.length; i++) {
    formData.append(`images${i}`, files[i]);
  }

  formData.forEach((item) => {
    console.log(item);
  });
  fetch("http://localhost:3000/api/v1/products/1", {
    method: "PUT",
    body: formData,
  });
}

uploadBtn.addEventListener("click", () => {
  uploadMultipleFiles();
});
