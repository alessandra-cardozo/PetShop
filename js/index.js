document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("pet-register")
    .addEventListener("submit", submitForm);
});

function saveCustomerData() {
  if (isCustomerFormValid()) {
    const customerData = {
      name: document.getElementById("customerName").value,
      email: document.getElementById("customerEmail").value,
      phone: document.getElementById("customerPhone").value,
      street: document.getElementById("customerStreet").value,
      number: document.getElementById("customerNumber").value,
    };

    localStorage.setItem("customerData", JSON.stringify(customerData));

    document.getElementById("customerForm").style.display = "none";
    document.getElementById("petForm").style.display = "block";
  } else {
    showToast(
      "Por favor, preencha todos os campos do formulário de cliente antes de prosseguir."
    );
  }
}

function loadCustomerData() {
  const savedData = localStorage.getItem("customerData");

  if (savedData) {
    const customerData = JSON.parse(savedData);
    document.getElementById("customerName").value = customerData.name;
    document.getElementById("customerEmail").value = customerData.email;
    document.getElementById("customerPhone").value = customerData.phone;
    document.getElementById("customerStreet").value = customerData.street;
    document.getElementById("customerNumber").value = customerData.number;
  }
}

function submitForm(e) {
  console.log("Chegou no submit");
  e.preventDefault();
  const petData = {
    type: document.querySelector('input[name="petType"]:checked').value,
    breed: document.getElementById("petBreed").value,
    temperament: Array.from(
      document.querySelectorAll('input[type="checkbox"]:checked')
    ).map((cb) => cb.value),
    additionalInfo: document.getElementById("additionalInfo").value,
  };

  const customerData = JSON.parse(localStorage.getItem("customerData"));
  if (!customerData) {
    console.log("Nenhum dado de cliente encontrado");
    return;
  }
  const data = {
    ...customerData,
    ...petData,
  };
  const formattedMessage = `
	Dados do cliente:

	Nome: ${data.name}

	Email: ${data.email}

	Telefone: ${data.phone}

	Rua: ${data.street}

	Número: ${data.number}

	Dados do pet:

	Tipo: ${data.type}

	Raça: ${data.breed}

	Temperamento: ${data.temperament.join(", ")}
	
	Informações adicionais: ${data.additionalInfo}
`;
  showToast(formattedMessage);

  localStorage.removeItem("customerData");
}

function isCustomerFormValid() {
  const name = document.getElementById("customerName").value.trim();
  const email = document.getElementById("customerEmail").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const street = document.getElementById("customerStreet").value.trim();
  const number = document.getElementById("customerNumber").value.trim();

  return (
    name !== "" &&
    email !== "" &&
    phone !== "" &&
    street !== "" &&
    number !== ""
  );
}

function showToast(message) {
  const toastElement = document.getElementById("toast");
  const toastBody = toastElement.querySelector(".toast-body");

  toastBody.textContent = message;
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
  setTimeout(() => {
    toast.hide();
  }, 5000);
}

function toggleBreedOptions() {
  const selectedType = document.querySelector('input[name="petType"]:checked');
  const breedSection = document.getElementById("breedSection");
  const petBreed = document.getElementById("petBreed");

  if (selectedType) {
    breedSection.style.display = "block";
    petBreed.innerHTML = "";
    if (selectedType.value === "dog") {
      petBreed.innerHTML +=
        '<option value="Labrador">Labrador</option><option value="Poodle">Poodle</option><option value="Beagle">Beagle</option><option value="Bulldog">Bulldog</option><option value="Golden Retriever">Golden Retriever</option><option value="Pug">Pug</option><option value="Boxer">Boxer</option><option value="Dachshund">Dachshund</option><option value="Shih Tzu">Shih Tzu</option><option value="Cocker Spaniel">Cocker Spaniel</option><option value="Husky">Husky</option><option value="Schnauzer">Schnauzer</option><option value="Rottweiler">Rottweiler</option><option value="Yorkshire Terrier">Yorkshire Terrier</option><option value="Pit Bull">Pit Bull</option><option value="Cachorro Caramelo">Caramelo</option><option value="Desconhecido">Desconhecido</option>';
    } else if (selectedType.value === "cat") {
      petBreed.innerHTML +=
        '<option value="Siamese">Siamese</option><option value="Persian">Persian</option><option value="Maine Coon">Maine Coon</option><option value="Sphynx">Sphynx</option><option value="British Shorthair">British Shorthair</option><option value="Abyssinian">Abyssinian</option><option value="Bengal">Bengal</option><option value="Ragdoll">Ragdoll</option><option value="Scottish Fold">Scottish Fold</option><option value="American Shorthair">American Shorthair</option><option value="Russian Blue">Russian Blue</option><option value="Siberian">Siberian</option><option value="Norwegian Forest">Norwegian Forest</option><option value="Oriental">Oriental</option><option value="Devon Rex">Devon Rex</option><option value="Cornish Rex">Cornish Rex</option><option value="Manx">Manx</option><option value="Himalayan">Himalayan</option><option value="Turkish Angora">Turkish Angora</option><option value="Balinese">Balinese</option><option value="Desconhecido">Desconhecido</option>';
    }
  } else {
    breedSection.style.display = "none";
    petBreed.innerHTML =
      '<option value="" disabled selected>Selecione a raça</option>';
  }
}
