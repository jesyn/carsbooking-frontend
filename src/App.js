import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./components/NotFound/NotFound";
import Footer from "./components/Footer/Footer";
import User from "./components/User/User";
import Product from "./components/Product/Product";
import Booking from "./components/Booking/Booking";
import BookingList from "./components/BookingList/BookingList";
import FormProduct from "./components/FormProduct/FormProduct";
import { AuthProvider } from "./hooks/index";
import GuardedRoute from "./components/Guard/GuardedRoute";

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/user-register" element={<User />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/products/:id" element={<Product />} />
                    <Route
                        path="/products/:id/booking"
                        element={
                            <GuardedRoute role={["ROLE_USER", "ROLE_ADMIN"]}>
                                <Booking />
                            </GuardedRoute>
                        }
                    />
                    <Route path="/my-bookings" element={<BookingList />} />
                    <Route
                        path="/post-product"
                        element={
                            <GuardedRoute role={["ROLE_ADMIN"]}>
                                <FormProduct />
                            </GuardedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
            <Footer />
        </div>
    );
}

export default App;
