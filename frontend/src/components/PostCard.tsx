export const PostCard = ({
  data,
  id,
  onClick
}: {
  data: { user: string; title: string; content: string };
  id: number;
  onClick: () => void;
}) => {
  return (
    <div key={id} className="border rounded-md shadow flex flex-col p-2 my-2" onClick={onClick}>
      <div className="flex items-center gap-2 text-sm">
        <span className="flex items-center justify-center rounded-full bg-blue-300 px-2">
          U
        </span>
        {data.user}
      </div>
      <h4 className="text-4xl font-bold mt-2">{data.title}</h4>
      <p className="text-gray-600">{data.content}</p>
    </div>
  );
};
