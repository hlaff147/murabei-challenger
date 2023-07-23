// routes/AppRouter.js
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Book from '../components/Book';
import App from '../App';
import Author from '../components/Author';

function AppRouter() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Book />} />
                <Route path="/author" element={<Author />} />
                <Route path="/book" element={<Book />} />
            </Routes>
        </>

    );
}

export default AppRouter;