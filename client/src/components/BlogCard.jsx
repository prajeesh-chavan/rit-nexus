import { Link } from "react-router-dom";

export const BlogCard = ({ post }) => {
  // Function to truncate HTML content while maintaining structure
  const truncateHtmlContent = (content, length = 100) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    let textContent = tempDiv.textContent || tempDiv.innerText || "";

    // Truncate based on the plain text length
    if (textContent.length > length) {
      textContent = textContent.slice(0, length) + "...";
    }

    // Use innerHTML again to maintain any remaining HTML
    tempDiv.innerHTML = textContent;
    return tempDiv.innerHTML;
  };

  return (
    <Link to={`/blog/${post._id}`}>
      <div className="bg-white h-96 border-gray border-2 border-solid box-border rounded-md w-full overflow-hidden flex flex-col items-start justify-center pb-6 gap-2 text-left text-xs hover:scale-[1.01] hover:shadow-sm transition-transform">
        <img
          className="w-full h-full object-cover"
          alt={post.title}
          src={`${import.meta.env.VITE_API_URL}/${post.image}`}
        />
        <div className="flex flex-col items-start justify-start px-6 gap-[0.625rem]">
          <div className="font-semibold">{post.date}</div>
          <div className="text-sm font-semibold text-secondary">
            {post.title}
          </div>
          <div>
            <p className="text-sm font-light text-black">
              <span
                dangerouslySetInnerHTML={{
                  __html: truncateHtmlContent(post.content, 100),
                }}
              />
            </p>
          </div>
          <div className="text-sm font-medium text-secondary">
            {/* <Link to={`/blog/${post._id}`}>Read more</Link> */}
          </div>
        </div>
      </div>
    </Link>
  );
};
