function addToInput(value) {
  document.getElementById('equation').value += value;
}

function clearInput() {
  document.getElementById('equation').value = '';
  document.getElementById('result').innerHTML = '';
}

function analyzeEquation() {
  const input = document.getElementById('equation').value.trim();
  const resultBox = document.getElementById('result');

  if (input === '') {
    resultBox.innerHTML = 'Please enter an equation.';
    return;
  }

  const tokens = [];
  const operators = ['+', '-', '*', '/', '(', ')'];
  let current = '';

  for (let char of input) {
    if (operators.includes(char)) {
      if (current.trim() !== '') {
        tokens.push({ type: 'Operand', value: current.trim() });
        current = '';
      }
      tokens.push({ type: 'Operator', value: char });
    } else {
      current += char;
    }
  }

  if (current.trim() !== '') {
    tokens.push({ type: 'Operand', value: current.trim() });
  }

  resultBox.innerHTML = tokens
    .map(token => `<div><strong>${token.type}:</strong> ${token.value}</div>`)
    .join('');
}


if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
      console.log('Service Worker registered with scope: ', registration.scope);
    }).catch(function(error) {
      console.log('Service Worker registration failed: ', error);
    });
  });
}