const youtubeKey = 'AIzaSyBWyResGF-DoPrIkDIM4HE0Um66V4aP22Y';
const youtubeUser = 'UCOMZV9kTj3mrZgM8WehaB6A';
const participantList = document.getElementById('participantList');

var points,title;

    const listCreator = (videoID) => {     
        let titleName = ""
        fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoID}&key=${youtubeKey}`)
        .then(response => {    
            return response.json()
        })
        .then(data => {        
            title=data.items[0].snippet.title;    
            titleName=title.split(' ').slice(0,2).join(' ')
            fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoID}&key=${youtubeKey}`)
    .then(response => {
        return response.json()
    })
    .then(data => {    
        views=parseInt(data.items[0].statistics.viewCount);
        likes=parseInt(data.items[0].statistics.likeCount);
        points=2*views + likes;          
      

        $("#headers1").after("<a target="+"_blank"+" href=https://www.youtube.com/watch?v="+videoID+"><li><mark>"+titleName+"</mark><small>"+points+"</small></li></a>");
    })               
                        
        })
}
const playlistID = "PL84zQvV2BhG03MX4erJytCwS4AWwKoK-x"
const getPlaylist = () => {     
    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistID}&maxResults=25&key=${youtubeKey}`)
    .then(response => {    
        
        return response.json();
    })
    .then(data => {        
        
        const items=data.items;
        items.forEach((i)=>{
            
            listCreator(i.snippet.resourceId.videoId);

    
        })
    })
}

//getPlaylist();