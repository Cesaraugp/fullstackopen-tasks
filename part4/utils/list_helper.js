

const dummy=(blogs)=>{
 
    return 1;
}

const totalLikes=(blogs)=>{
    
    const likes= blogs.map((x)=>x.likes)
    return likes.reduce((s,i)=>s+i,0);
}
const favoriteBlog=(blogs)=>{
    if(blogs.length<1) return {};
    const max = blogs.reduce(function(prev, current) {
        return (prev.likes > current.likes) ? prev : current
    })
    return {
        title: max['title'],
        author: max['author'],
        likes: max['likes']
    }

}
const mostBlogs =(blogs)=>{
    const blogAuthorsCount=[];
    blogs.forEach(el=>{
        const hasAuthor= blogAuthorsCount.find(x => x.author === el.author)
        if(hasAuthor){
            const i= blogAuthorsCount.indexOf(hasAuthor)
            blogAuthorsCount[i]['blogs']+=1;
        }
        else{
            blogAuthorsCount.push({
                author:el.author,
                blogs:1
            })
        }
    })
    const mostBlogsAuthor = blogAuthorsCount.reduce((max, blog) => max.blogs > blog.blogs ? max : blog);
    return mostBlogsAuthor
}

const mostLiked =(blogs)=>{
    const mostLikedAuthors=[];
    blogs.forEach(el=>{
        const hasAuthor= mostLikedAuthors.find(x => x.author === el.author)
        if(hasAuthor){
            const i= mostLikedAuthors.indexOf(hasAuthor)
            mostLikedAuthors[i]['likes']+=el.likes;
        }
        else{
            mostLikedAuthors.push({
                author:el.author,
                likes:el.likes
            })
        }
    })
    const mostLikedAuthor = mostLikedAuthors.reduce((max, blog) => max.likes > blog.likes ? max : blog);
    return mostLikedAuthor
}


module.exports={
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLiked

}