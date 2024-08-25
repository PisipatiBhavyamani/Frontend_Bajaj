function handleSubmit() {
    const jsonInput = document.getElementById('jsonInput').value;
    const errorElement = document.getElementById('error');
    const filterContainer = document.getElementById('filterContainer');
    const filterSelect = document.getElementById('filterSelect');
    const responseElement = document.getElementById('response');
  
    try {
      const parsedJson = JSON.parse(jsonInput);
      errorElement.textContent = '';
      filterContainer.classList.remove('hidden');
      window.responseData = parsedJson;
      updateResponse();
    } catch (err) {
      errorElement.textContent = 'Invalid JSON format';
      filterContainer.classList.add('hidden');
      responseElement.textContent = '';
    }
  }
  
  function updateResponse() {
    const selectedOptions = Array.from(document.getElementById('filterSelect').selectedOptions).map(option => option.value);
    let filteredData = window.responseData || [];
  
    if (selectedOptions.includes('Alphabets')) {
      filteredData = filteredData.filter(item => isNaN(item));
    }
    if (selectedOptions.includes('Numbers')) {
      filteredData = filteredData.filter(item => !isNaN(item));
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      filteredData = [filteredData.filter(item => /[a-z]/.test(item)).sort().pop()];
    }
  
    document.getElementById('response').textContent = filteredData.join(', ');
  }
  
  document.getElementById('filterSelect').addEventListener('change', updateResponse);
  