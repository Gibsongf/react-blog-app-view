import { NavLink } from "react-router-dom";

const Post = ({ title, author, timestamp, text, setPostId, id }) => {
    const date = new Date(timestamp);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    const format_date = date.toLocaleString("en-US", options);
    return (
        <div className="post">
            <NavLink to={`/post/${id}`} onClick={setPostId}>
                <h2 className="title" id={id}>
                    {title}
                </h2>
            </NavLink>
            <h4>
                {author.first_name} {author.last_name}
            </h4>
            <h5>{format_date}</h5>
            <p>{text}</p>
        </div>
    );
};

export const RenderAllPost = ({ allPost, setPostId }) => {
    return (
        <div className="posts-content">
            {allPost.map((post) => {
                if (!post) {
                    return "";
                }
                return (
                    <Post
                        key={post._id}
                        id={post._id}
                        title={post.title}
                        author={post.author}
                        timestamp={post.timestamp}
                        text={post.text}
                        setPostId={setPostId}
                    />
                );
            })}
        </div>
    );
};
