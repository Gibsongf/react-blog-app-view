import { useEffect, useState } from "react";
import { RenderAllPost } from "../components/Posts";
import "../styles/App.css";
import { NavLink } from "react-router-dom";
import { getAuthorDetails } from "../Api";

const AuthorInfo = (props) => {
    const { name, description } = props;

    return (
        <div className="author-details">
            <h1>{name}</h1>
            {/* <h1>{description.length > 0 ? description : ""}</h1> */}
        </div>
    );
};

export const AuthorDetails = ({
    savePostId,
    data,
    wasUpdated,
    setWasUpdated,
}) => {
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
            <AuthorInfo
                name={currentAuthor.name}
            />

            <RenderAllPost
                allPost={currentAuthor.posts}
                setPostId={savePostId}
            />
        </div>
    );
};
