import { useState } from "react";
import { newComment } from "../Api";

const newContentValidator = (e) => {
    const minLen = { text: 10, title: 4, user_name: 4, comment_text: 4 };
    const el = e.target;
    if (el.hasAttribute("required") && el.value.length < minLen[el.name]) {
        el.setAttribute("style", "border-color:red");
        el.className = "invalid";
        return false;
    } else {
        el.setAttribute("style", "border-color:rgb(193, 186, 186)");
        el.classList.remove("invalid");
        return true;
    }
};
export const NewComment = (props) => {
    const initialState = { user_name: "", comment_text: "" };
    const [formData, setFormData] = useState(initialState);
    const [validData, setValidData] = useState();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setValidData(newContentValidator(e));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validData) {
            await newComment(props.postID, formData);
            props.setWasUpdated(!props.wasUpdated);
            e.target.parentElement.reset();
        }
    };
    return (
        <form method="post" className="new-comment-form">
            <input
                placeholder="Name (min characters: 4)"
                type="text"
                name="user_name"
                id="user_name"
                onChange={handleInputChange}
                required
            />
            <input
                placeholder="Write a comment (min characters: 4)"
                type="text"
                name="comment_text"
                id="comment_text"
                required
                onChange={handleInputChange}
            />
            <button onClick={handleSubmit} type="submit">
                Comment
            </button>
        </form>
    );
};

export const PostComment = (props) => {
    const { userName, text, timestamp } = props;
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
        <div className="comment">
            <p className="comment-username">{userName}</p>
            <p className="comment-timestamp">{format_date}</p>
            <p className="comment-text">{text}</p>
        </div>
    );
};
