const container = document.querySelector('.container');
const form = document.forms[0];
const fileInput = document.querySelector(".custom-file-input");

fileInput.onchange = function() {
  if(this.files[0].size > 76600){
    alert("Image is too large! Try smaller one");
    this.value = "";
  };
};

form.onsubmit = (e) => {
  e.preventDefault();

  const fr = new FileReader();

  fr.onload = async () => {
    await fetch('/data', {
      method: 'POST',
      body: JSON.stringify({
        title: form.elements.title.value,
        description: form.elements.description.value,
        image: fr.result,
      })
    });

    updateImages();
  }

  fr.readAsDataURL(form.elements.image.files[0]);
};

const updateImages = async () => {
  const res = await fetch('/data');
  const data = await res.json()

  document.querySelector('.posts').remove();

  container.insertAdjacentHTML('beforeend', `
    <div class="posts">
      ${data.map(elem => `
        <div class="post mt-5">
          <div class="post__image-wrapper">
            <img src="${elem.image}">
          </div>
          <div class="post__text-wrapper ml-4">
            <h2>${elem.title}</h2>
            <p>${elem.description}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `);
};

window.onload = updateImages;
