export const getTestMessage = (req, res) => {
    res.status(200).json({ message: 'Witaj! To jest odpowiedź z endpointu GET.' });
};

export const postTestMessage = (req, res) => {
    const { message } = req.body;
    if (message) {
        res.status(200).json({ receivedMessage: message });
    } else {
        res.status(400).json({ error: 'Nie podano wiadomości w body.' });
    }
};