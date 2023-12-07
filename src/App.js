import "./styles/App.css";
import { getIndexData } from "./Api";
import { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { PostDetails } from "./pages/PostDetails";
import { Home } from "./pages/Home";
import { AuthorDetails } from "./pages/AuthorDetails";

const Header = () => {
    return (
        <div className="header">
            <NavLink to="/" className="back-home">
                <h1>Blog</h1>
            </NavLink>
        </div>
    );
};

function App() {
    const [data, setData] = useState(null);
    const [postId, setPostId] = useState();
    const [wasUpdated, setWasUpdated] = useState(false);

    const savePostId = (e) => {
        setPostId(e.target.id);
        localStorage.setItem("postID", e.target.id);
    };
    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching data");
            try {
                const result = await getIndexData();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [wasUpdated]);

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            savePostId={savePostId}
                            data={data}
                            wasUpdated={wasUpdated}
                            setWasUpdated={setWasUpdated}
                        />
                    }
                />
                <Route
                    path="/post/:id"
                    element={
                        <PostDetails
                            postId={postId}
                            homeUpdate={wasUpdated}
                            setHomeUpdate={setWasUpdated}
                        />
                    }
                />
                <Route
                    path="/author/:id"
                    element={<AuthorDetails setPostId={savePostId} />}
                />
            </Routes>
        </div>
    );
}

export default App;
