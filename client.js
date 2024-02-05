document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calc').addEventListener('click', function(event) {
        event.preventDefault();
        var weight = document.getElementById('weight').value;
        var height = document.getElementById('height').value;

        fetch('/calculate-bmi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `weight=${encodeURIComponent(weight)}&height=${encodeURIComponent(height)}`
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').textContent = `Your BMI Result is: ${data.bmi}`;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').textContent = 'An error occurred while calculating BMI.';
        });
    });
});
