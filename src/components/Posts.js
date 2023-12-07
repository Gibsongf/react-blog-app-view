import { NavLink } from "react-router-dom";

const Post = ({ title, author, timestamp, text, setPostId, id }) => {
    const date = new Date(timestamp);
    // console.log(author);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    const saveAuthorId = () => {
        if (localStorage["authorID"]) {
            localStorage.removeItem("authorID");
        }
        localStorage.setItem("authorID", author._id);
    };
    const format_date = date.toLocaleString("en-US", options);
    return (
        <div className="post">
            <NavLink to={`/post/${id}`} onClick={setPostId}>
                <h2 className="title" id={id}>
                    {title}
                </h2>
            </NavLink>
            <NavLink to={`/author/${author._id}`} onClick={saveAuthorId}>
                <h4 className="all-post-author-link">
                    {author.first_name} {author.last_name}
                </h4>
            </NavLink>
            {/* <h4>
                {author.first_name} {author.last_name}
            </h4> */}
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
