const { Router } = require("express");
const router = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

router.get("/", (req, res) => {
  res.render("index", {
    title: "Mini Messageboard",
    messages: messages
  });
});

router.get("/new", (req, res) => {
  res.render("form");
});

router.post("/new", (req, res) => {
  res.send("POST request received!");
  messages.push({ 
    text: req.body.text, 
    user: req.body.author, 
    added: new Date() 
  });
  res.redirect("/")
});

router.get("/messages/:messageIndex", (req, res) => {
  const messageIndex = Number(req.params.messageIndex);
  const message = messages[messageIndex];

  if (!Number.isInteger(messageIndex) || !message) {
    return res.status(404).send("Message not found");
  }

  res.render("message", {
    message: message
  });
});

module.exports = router;