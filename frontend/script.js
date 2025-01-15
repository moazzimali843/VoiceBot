// // Check if the browser supports the Web Speech API
// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();

// document.getElementById('micButton').addEventListener('click', () => {
//     recognition.start();
// });

// recognition.onresult = (event) => {
//     const transcript = event.results[0][0].transcript;
//     document.getElementById('voiceInput').value = transcript;
// };

// document.getElementById('submitButton').addEventListener('click', () => {
//     const voiceInput = document.getElementById('voiceInput').value;

//     if (voiceInput) {
//         // Send the voice input to the backend using a fetch request
//         fetch('http://127.0.0.1:5000/chat', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ message: voiceInput })
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Response from backend:', data);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     } else {
//         alert('Please provide a voice input.');
//     }
// });

//------------------------------------------------------------------------------------
// // Check if the browser supports the Web Speech API
// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();

// // document.getElementById('micButton').addEventListener('click', () => {
// //     recognition.start();
// // });

// recognition.onresult = (event) => {
//     const transcript = event.results[0][0].transcript;
//     document.getElementById('voiceInput').value = transcript;
// };

// document.getElementById('micButton').addEventListener('click', () => {
//     const voiceInput = document.getElementById('voiceInput').value;

//     if (voiceInput) {
//         // Send the voice input to the backend using a fetch request
//         fetch('http://127.0.0.1:5000/chat', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ message: voiceInput })
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Response from backend:', data);
//             document.getElementById('image').src="talking.gif"

//             // document.getElementById("result").innerText=data.response;
           
//             // Play the response text as speech
//             const utterance = new SpeechSynthesisUtterance(data.response);
//             window.speechSynthesis.speak(utterance);
//             const speaking = window.speechSynthesis.speaking(utterance);
//             if (!speaking ){
// document.getElementById('image').src="static.png"
// document.getElementById('voiceInput').value=""
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     } else {
//         recognition.start();
//         // alert('Please provide a voice input.');
//     }
// });
//------------------------------------------------------------------------------------


// Check if the browser supports the Web Speech API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('voiceInput').value = transcript;
};

// document.getElementById('micButton').addEventListener('click', () => {
//     const voiceInput = document.getElementById('voiceInput').value;

//     if (voiceInput) {
//         // Send the voice input to the backend using a fetch request
//         fetch('http://127.0.0.1:5000/chat', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ message: voiceInput })
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Response from backend:', data);
//             document.getElementById('image').src = "talking.gif";  // Show talking.gif

//             // Play the response text as speech
//             const utterance = new SpeechSynthesisUtterance(data.response);

//             // Event listener for when speech starts
//             utterance.onstart = () => {
//                 document.getElementById('image').src = "talking.gif";
//             };

//             // Event listener for when speech ends
//             utterance.onend = () => {
//                 document.getElementById('image').src = "static.png";
//                 document.getElementById('voiceInput').value = "";
//             };

//             window.speechSynthesis.speak(utterance);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     } else {
//         recognition.start();
//     }
// });



document.getElementById('micButton').addEventListener('click', () => {
    const voiceInput = document.getElementById('voiceInput').value;

    if (voiceInput) {
        // Send the voice input to the backend using a fetch request
        fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: voiceInput })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response from backend:', data);
            document.getElementById('image').src = "talking.gif";  // Show talking.gif

            // Play the response text as speech
            const utterance = new SpeechSynthesisUtterance(data.response);

            // Get the list of voices and select a female voice
            const voices = window.speechSynthesis.getVoices();
            const femaleVoice = voices.find(voice => voice.name.toLowerCase().includes("female"));

            if (femaleVoice) {
                utterance.voice = femaleVoice; // Use the female voice
            } else {
                console.warn("No female voice found. Using default voice.");
            }

            // Event listener for when speech starts
            utterance.onstart = () => {
                document.getElementById('image').src = "talking.gif";
            };

            // Event listener for when speech ends
            utterance.onend = () => {
                document.getElementById('image').src = "static.png";
                document.getElementById('voiceInput').value = "";
            };

            window.speechSynthesis.speak(utterance);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        recognition.start();
    }
});
