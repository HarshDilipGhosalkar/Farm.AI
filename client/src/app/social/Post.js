// components/Post.js
const Post = ({ image, text, hashtags }) => {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
        {image && (
          <img className="w-full h-64 object-cover" src={image} alt="Post" />
        )}
        <div className="p-8">
          {text && <p className="block mt-1 text-lg leading-tight font-medium text-black">{text}</p>}
        </div>
      </div>
    );
  };
  
  export default Post;
  