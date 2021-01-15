import React, {useState} from 'react';
import {Button,Input} from 'antd';
import '../css/Post.css';

function Post(props) {
    const [post,setPost] = useState("");
    const [user, setUser] = useState(props.user);
    const[info, setInfo] = useState([]);
    const[allInfo,setAllInfo] = useState([]);



//handler functions
    function handleChange(event) {
        setPost(event.target.value);
    };


    async function handleSubmit(event) {
        event.preventDefault();
        console.log(user);
        const data = {info: post, username: user};
        const formsettings = {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)
        }
        await fetch("/post",formsettings).then((res) => {
        });
        await fetch("/retrieve", formsettings).then(response => response.json()).then((response) => {
            const posts  = [];
            response.map((item) => {
                posts.push(item.info);
            });
            setInfo(posts);
        });
        await fetch("/retrieve2").then(response => response.json()).then((response) => {
            const allposts = [];
            response.map((item) => {
                allposts.push(item.username + ": " + item.info);
            });
            setAllInfo(allposts);
        })
        document.getElementById("textarea").value = "";
    };



    return(
        <div>
        <div id="Post">
            <Input.TextArea id="textarea"
            placeholder = "What would you like to post..."
            autoSize={{ minRows: 2, maxRows: 6 }} value={post} onChange={handleChange}>
          </Input.TextArea>
        </div> 
        <form onSubmit = {handleSubmit} id = "form">
            <Button htmlType="submit" form="form" id="post-button"> Post</Button>
        </form>
        <div id="Your-Posts">
        <div id="box">
            {info.map((item,index) => 
                <li key={index} id="your-words">{item}</li>
            )}
        </div>
        </div>
            <div id="box2">
                {allInfo.map((item,index) =>
                <li key={index} id="allwords">{item}</li>
                )}
            </div>
        </div>
    );
};


export default Post;