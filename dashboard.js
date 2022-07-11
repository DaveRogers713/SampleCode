import Layout from "../components/layout/Layout";
import { withProtected } from "../components/auth/routes";
import BlogCreatePost from "../components/blog/BlogCreatePost";
import dynamic from "next/dynamic";
import { Suspense, useState, useEffect } from "react";
import CreatePostModal from "../components/blog/CreatePostModal";
import { db } from "../firebase/initFirebase";

const BlogCard2 = dynamic(() => import("../components/blog/BlogCard2"), {
  suspense: true,
});

const dashboard = () => {
  const [postOpen, setPostOpen] = useState(false);
  const modalToggle = () => {
    setPostOpen(!postOpen);
  };

  const [blogPost, setBlogPost] = useState([]);
  useEffect(() => {
    db
      .collection("publicBlogPosts")
      .onSnapshot((snapshot) => {
        setBlogPost(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <Layout>
  
      <div className="grid grid-cols-3 gap-4 grid-flow-row-dense mt-5 pb-16 pt-10">
        <Suspense fallback={`Loading...`}>
        {blogPost.map((article)=>(
            <BlogCard2 
                title={article.title}
                programmingLanguages={article.programmingLanguages}
                content={article.content}
                key={article.title}
            />
        ))}
        <BlogCard2 />
        </Suspense>
        {postOpen && <CreatePostModal postOpen={postOpen} modalToggle={modalToggle} />}
      </div>

      <div className="fixed right-0 mr-4 mt-5">
        <BlogCreatePost postOpen={postOpen} modalToggle={modalToggle} />
      </div>
    </Layout>
  );
};

// export default dashboard
export default withProtected(dashboard);
