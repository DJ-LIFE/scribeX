const PostsSkeleton = () => {
  return (
    <div className="flex flex-col items-center p-4 space-y-2">
        <span className="flex justify-start w-full"><img src="" alt="" className="rounded-full p-8 bg-slate-200 animate-pulse text-center" /></span>
        <div className="h-20 w-full bg-slate-200 animate-pulse rounded-lg"></div>
        <div className="h-40 w-full bg-slate-200 animate-pulse rounded-lg"></div>
    </div>
  )
}

export default PostsSkeleton