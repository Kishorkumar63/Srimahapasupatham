const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const DOB = document.getElementById("DOB").value.trim();
    const TOB = document.getElementById("time").value.trim();
    const POB = document.getElementById("POB").value.trim();
    const email = document.getElementById("email").value.trim();
    const number = document.getElementById("number").value.trim();
    const message = document.getElementById("message").value.trim();
    console.log(DOB);
    const formData = new FormData();
    formData.append("DOB", DOB);
    formData.append("TOB", TOB);
    formData.append("POB", POB);
    formData.append("email", email);
    formData.append("number", number);
    formData.append("message", message);

    const response = await fetch("/send-message", {
      method: "POST",
      body: formData,
    });
    console.log(Object.fromEntries(formData.entries()));

    const data = await response.json();

    if (data.success) {
      alert("Message sent successfully!");
      contactForm.reset();
    } else {
      alert("Error: " + data.error);
    }
  } catch (error) {
    console.error("Error sending message:", error);
    alert("An error occurred while sending the message. Please try again.");
  }
});
