import "../styles/App.css";
// import { AllPost } from "../components/Posts";
import { NavLink } from "react-router-dom";

const AuthorInfo = (props) => {
    const { fname, lname, description } = props;

    return (
        <div className="author-details">
            <h1>
                Welcome {fname} {lname}{" "}
            </h1>
            {/* <h1>{description.length > 0 ? description : ""}</h1> */}
        </div>
    );
};

export const AuthorDetails = ({ savePostId, data, wasUpdated, setWasUpdated }) => {
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }
    return (
        <div className="content">
            

            <AuthorInfo
                fname={data.author.first_name}
                lname={data.author.last_name}
                description={data.author.description}
            />
           
            
            {/* <AllPost
                allPosts={data.posts}
                author={data.author.first_name}
                setPostId={savePostId}
            /> */}
        </div>
    );
};
