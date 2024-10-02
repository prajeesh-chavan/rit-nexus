const Contact = require("../models/Contact");

const submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  // Check if all fields are present
  if (!name || !email || !message) {
    res.status(400);
    throw new Error("Please fill in all fields.");
  }

  try {
    const contact = new Contact({ name, email, message });
    await contact.save();
    res
      .status(201)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    res.status(500);
    throw new Error("Server error, message not sent.");
  }
};

module.exports = { submitContactForm };
