import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export default function Reader(props) {
  return (
    <div className=" h-[80%] overflow-y-scroll scrollbar-thin">
      <ReactMarkdown
        className="prose w-full  self-center"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {props.recipe}
      </ReactMarkdown>
    </div>
  );
}
