const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
}]

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