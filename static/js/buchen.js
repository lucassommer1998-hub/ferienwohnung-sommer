// buchen.js – Live-Preisberechnung im Buchungsformular

document.addEventListener('DOMContentLoaded', () => {
    const anreise = document.getElementById('anreise');
    const abreise = document.getElementById('abreise');
    const preisInfo = document.getElementById('preis-info');
    const preisText = document.getElementById('preis-text');

    const PREIS_PRO_NACHT = 89;
    const ENDREINIGUNG = 50;

    // Heutiges Datum als Minimum für Anreise setzen
    const heute = new Date().toISOString().split('T')[0];
    if (anreise) anreise.min = heute;

    function updateAbreiseMin() {
        if (!anreise.value) return;
        const minAbreise = new Date(anreise.value);
        minAbreise.setDate(minAbreise.getDate() + 3); // Mindestaufenthalt 3 Nächte
        abreise.min = minAbreise.toISOString().split('T')[0];

        // Wenn aktuelles Abreisedatum zu früh ist, zurücksetzen
        if (abreise.value && abreise.value < abreise.min) {
            abreise.value = '';
            preisInfo.classList.add('hidden');
        }
    }

    function berechnePreis() {
        if (!anreise.value || !abreise.value) {
            preisInfo.classList.add('hidden');
            return;
        }

        const von = new Date(anreise.value);
        const bis = new Date(abreise.value);
        const naechte = Math.round((bis - von) / (1000 * 60 * 60 * 24));

        if (naechte < 3) {
            preisText.textContent = '⚠️ Mindestaufenthalt: 3 Nächte';
            preisInfo.classList.remove('hidden');
            return;
        }

        const uebernachtung = naechte * PREIS_PRO_NACHT;
        const gesamt = uebernachtung + ENDREINIGUNG;

        preisText.textContent =
            `${naechte} Nächte × 89 € + 50 € Endreinigung = ${gesamt} € Gesamt`;
        preisInfo.classList.remove('hidden');
    }

    if (anreise && abreise) {
        anreise.addEventListener('change', () => {
            updateAbreiseMin();
            berechnePreis();
        });
        abreise.addEventListener('change', berechnePreis);
    }
});