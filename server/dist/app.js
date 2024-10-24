"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
}));
// Obsługa nieznalezionych tras (404)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});
app.get('/check', async (req, res) => {
    try {
        await prisma.$connect();
        res.status(200).send("Połączenie z bazą danych działa poprawnie.");
    }
    catch (error) {
        console.error("Błąd połączenia z bazą danych", error);
        res.status(500).send("Błąd połączenia z bazą danych");
    }
});
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map