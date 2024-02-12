const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
   
    const Name= document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
   
    const formData = new FormData();
    formData.append("name",Name)
    formData.append("message", message);

    const response = await fetch("/send-review", {
      method: "POST",
      body: formData,
    });
   // console.log(Object.fromEntries(formData.entries()));

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
