document.getElementById('registrationForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les données du formulaire
    const formData = new FormData(this);
    const data = {
        regd_no: formData.get('regd_no'),
        name: formData.get('name'),
        email: formData.get('email'),
        branch: formData.get('branch'),
    };

    try {
        // Envoyer les données en POST
        const response = await fetch('http://localhost:3019/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Indiquer JSON comme Content-Type
            },
            body: JSON.stringify(data), // Convertir les données en JSON
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message); // Afficher le message
            window.location.href = '/success'; 
        } else {
            alert(`Erreur : ${response.status} - ${result.message}`);
        }
    } catch (error) {
        console.error("Erreur lors de la soumission :", error);
        alert('Erreur lors de la soumission du formulaire. Vérifiez votre connexion réseau.');
    }
});
