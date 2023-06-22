import "../styles/App.css";
import { RenderAllPost } from "../components/Posts";

export const Home = ({ savePostId, data }) => {
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }
    return (
        <div className="content">
            <RenderAllPost allPost={data.allPost} setPostId={savePostId} />
        </div>
    );
};
