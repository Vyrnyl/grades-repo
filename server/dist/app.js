"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const gradeRoutes_1 = __importDefault(require("./routes/gradeRoutes"));
const classRoutes_1 = __importDefault(require("./routes/classRoutes"));
const programRoutes_1 = __importDefault(require("./routes/programRoutes"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const userAuth_1 = __importDefault(require("./middleware/userAuth"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    exposedHeaders: ['Authorization', 'Refresh-Token']
}));
app.use((req, res, next) => {
    if (req.path === '/auth/signup'
        || req.path === '/auth/login'
        || req.path === '/auth/refresh-token') {
        return next();
    }
    (0, userAuth_1.default)(req, res, next);
});
app.get('/', (req, res) => {
    res.json({ message: 'HOME' });
});
app.use('/auth', authRoutes_1.default);
app.use('/user', userRoutes_1.default);
app.use('/grade', gradeRoutes_1.default);
app.use('/class', classRoutes_1.default);
app.use('/program', programRoutes_1.default);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`));
