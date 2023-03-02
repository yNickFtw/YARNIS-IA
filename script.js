const inputQuestion = document.getElementById("inputQuestion");
const result = document.getElementById("result");
const buttonSubmit = document.getElementById('button-submit')

inputQuestion.addEventListener("keypress", (e) => {
  if (inputQuestion.value && e.key === "Enter") SendQuestion();
});

buttonSubmit.addEventListener("click", (e) => {
    SendQuestion();
})


const OPENAI_API_KEY = "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";

function SendQuestion() {
  var sQuestion = inputQuestion.value;

  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: sQuestion,
      max_tokens: 2048, // Tamanho da resposta
      temperature: 0.5, // Criatividade na resposta
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (result.value) result.value += "\n";

      if (json.error?.message) {
        result.value += `Error: ${json.error.message}`;
      } else if (json.choices?.[0].text) {
        var text = json.choices[0].text || "Sem resposta";

        result.value += "Chat do Nick: " + text;
      }

      result.scrollTop = result.scrollHeight;
    })
    .catch((error) => console.log(`Error: ${error}`))
    .finally(() => {
        inputQuestion.value =""
        inputQuestion.disabled = false
        inputQuestion.focus()
    })

    if (result.value) result.value += "\n\n\n";

  result.value += `Eu: ${sQuestion}`;
  inputQuestion.value = "Carregando, aguarde...";
  inputQuestion.disabled = true;

  result.scrollTop = result.scrollHeight;
}
