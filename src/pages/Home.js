import "../styles/App.css";
import { RenderAllPost } from "../components/Posts";
import { Loading } from "../components/Loading";

export const Home = ({ savePostId, data }) => {
    if (!data) {
        // Data is still being fetched
        return <Loading />;
    }
    return (
        <div className="content">
            <RenderAllPost allPost={data.allPost} setPostId={savePostId} />
        </div>
    );
};
