import { useEffect, useState } from "react";
import { RenderAllPost } from "../components/Posts";
import "../styles/App.css";
import { getAuthorDetails } from "../Api";

const AuthorInfo = (props) => {
    const { name } = props;
    return (
        <div className="author-details">
            <h1>Posts of {name}</h1>
        </div>
    );
};

export const AuthorDetails = ({ setPostId }) => {
    const [currentAuthor, setCurrentAuthor] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const authorID = localStorage["authorID"];
            try {
                const result = await getAuthorDetails(authorID);
                setCurrentAuthor(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    if (!currentAuthor) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }
    return (
        <div className="content">
            <AuthorInfo name={currentAuthor.name} />

            <RenderAllPost
                allPost={currentAuthor.posts}
                setPostId={setPostId}
            />
        </div>
    );
};
