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
module.exports={
    dummy,
    totalLikes,
    favoriteBlog
}