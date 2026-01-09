function startBreathing() {
    const inhaleTime = parseInt(document.getElementById('inhale').value);
    const holdTime = parseInt(document.getElementById('hold').value);
    const exhaleTime = parseInt(document.getElementById('exhale').value);
    const totalTime = inhaleTime + holdTime + exhaleTime + holdTime;

    const circle = document.querySelector('.circle');
    circle.style.animation = `breathe ${totalTime}s infinite`;

    const keyframes = `
        @keyframes breathe {
            0%, 100% { transform: scale(1); }
            ${((inhaleTime / totalTime) * 100).toFixed(2)}% { transform: scale(1.5); }
            ${(((inhaleTime + holdTime) / totalTime) * 100).toFixed(2)}% { transform: scale(1.5); }
            ${(((inhaleTime + holdTime + exhaleTime) / totalTime) * 100).toFixed(2)}% { transform: scale(0.5); }
        }
    `;

    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
}