const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const input = document.getElementById("user-input");
const resultsDiv = document.getElementById("results-div");

const validPatterns = [
  /^1?\s?\d{3}-\d{3}-\d{4}$/,                      
  /^1?\s?\(\d{3}\)\s?\d{3}-\d{4}$/,                
  /^1?\s?\d{10}$/,                                 
  /^1?\s?\d{3}\s\d{3}\s\d{4}$/                     
];

function isValidPhoneNumber(number) {
  if (/^1/.test(number)) {
    if (!/^1\s|\(.*\)/.test(number) && !number.startsWith("1(") && !number.startsWith("1 ")) {
      return false;
    }
  }
  if (/^1[2-9]/.test(number)) return false;
  if (/^1{2,}/.test(number)) return false;
  if (!/^[\d\s\-()]+$/.test(number)) return false;
  return validPatterns.some(pattern => pattern.test(number));
}

function checkPhoneNumber() {
  const inputValue = input.value.trim();
  if (inputValue === "") {
    alert("Please provide a phone number");
    return;
  }
  const valid = isValidPhoneNumber(inputValue);
  resultsDiv.textContent = `${valid ? "✅ Valid" : "❌ Invalid"} US number: ${inputValue}`;
  resultsDiv.className = valid ? "valid" : "invalid";
}

checkBtn.addEventListener("click", checkPhoneNumber);

clearBtn.addEventListener("click", () => {
  resultsDiv.textContent = "";
  input.value = "";
  input.focus();
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    checkPhoneNumber();
  }
});